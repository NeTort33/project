from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import uuid
import sqlite3
from datetime import datetime
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

os.makedirs('backend/data', exist_ok=True)
os.makedirs('backend/uploads', exist_ok=True)

DB_PATH = 'backend/data/skins_shop.db'
UPLOAD_FOLDER = 'backend/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create tables if they don't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS games (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            logo TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skins (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            imageUrl TEXT NOT NULL,
            price INTEGER NOT NULL,
            rarity TEXT NOT NULL,
            game_id TEXT NOT NULL,
            type TEXT NOT NULL,
            float REAL,
            pattern TEXT,
            hero TEXT,
            available BOOLEAN NOT NULL DEFAULT 1,
            discount INTEGER,
            FOREIGN KEY (game_id) REFERENCES games (id)
        )
    ''')
    
    # Insert initial data if tables are empty
    cursor.execute('SELECT COUNT(*) FROM games')
    if cursor.fetchone()[0] == 0:
        games = [
            ('1', 'Dota 2', 'dota2'),
            ('2', 'CS2', 'cs2')
        ]
        cursor.executemany('INSERT INTO games VALUES (?, ?, ?)', games)
        
        skins = [
            ('1', 'Demon Eater', 'https://cdn.dota2.net//item/Demon%20Eater/300.png', 1219, 'Arcana', '1', 'Облик', None, None, 'Shadow Fiend', 1, None),
            ('2', 'Blades of Voth Domosh', 'https://cdn.dota2.net//item/Blades%20of%20Voth%20Domosh/300.png', 1542, 'Arcana', '1', 'Оружие', None, None, 'Legion Commander', 1, 10),
            ('3', 'Bitter Lineage', 'https://cdn.dota2.net//item/Bitter%20Lineage/300.png', 208, 'Immortal', '1', 'Оружие', None, None, 'Troll Warlord', 1, None),
            ('4', 'Exalted Great Sages Reckoning', 'https://cdn.dota2.net//item/Exalted%20Great%20Sage%27s%20Reckoning/300.png', 1458, 'Immortal', '1', 'Голова', None, None, 'Monkey King', 1, None),
            ('5', 'AWP | Хроматическая абберация', 'https://cdn2.csgo.com//item/AWP%20%7C%20Chromatic%20Aberration%20%28Field-Tested%29/300.png', 827, 'Тайное', '2', 'Снайперская винтовка', 0.21, None, None, 1, None),
            ('6', 'AK-47 | Выстрел в голову', 'https://cdn2.csgo.com//item/AK-47%20%7C%20Head%20Shot%20%28Well-Worn%29/300.png', 526, 'Тайное', '2', 'Штурмовая винтовка', 0.42, None, None, 1, 10),
            ('7', 'USP-S | Извилины', 'https://cdn2.csgo.com//item/USP-S%20%7C%20Cortex%20%28Well-Worn%29/300.png', 238, 'Засекреченное', '2', 'Пистолет', 0.38, None, None, 1, None),
            ('8', 'Мясник | Феникс', 'https://cdn2.csgo.com//item/Slingshot%20%7C%20Phoenix/300.png', 815, 'Исключительный', '2', 'Агент', None, None, None, 1, None)
        ]
        cursor.executemany('INSERT INTO skins VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', skins)
    
    conn.commit()
    conn.close()

@app.route('/api/skins', methods=['GET'])
def get_skins():
    game_id = request.args.get('game')
    search = request.args.get('search', '').lower()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = '''
        SELECT s.*, g.name as game_name, g.logo as game_logo
        FROM skins s
        JOIN games g ON s.game_id = g.id
        WHERE 1=1
    '''
    params = []
    
    if game_id:
        query += ' AND s.game_id = ?'
        params.append(game_id)
    
    if search:
        query += ''' AND (
            LOWER(s.name) LIKE ? OR
            LOWER(s.type) LIKE ? OR
            LOWER(s.hero) LIKE ?
        )'''
        search_param = f'%{search}%'
        params.extend([search_param, search_param, search_param])
    
    if min_price is not None:
        query += ' AND s.price >= ?'
        params.append(min_price)
    
    if max_price is not None:
        query += ' AND s.price <= ?'
        params.append(max_price)
    
    cursor.execute(query, params)
    rows = cursor.fetchall()
    
    skins = []
    for row in rows:
        skin = dict(row)
        skin['game'] = {
            'id': skin['game_id'],
            'name': skin['game_name'],
            'logo': skin['game_logo']
        }
        del skin['game_id']
        del skin['game_name']
        del skin['game_logo']
        skins.append(skin)
    
    conn.close()
    return jsonify(skins)

@app.route('/api/skins/<skin_id>', methods=['GET'])
def get_skin(skin_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT s.*, g.name as game_name, g.logo as game_logo
        FROM skins s
        JOIN games g ON s.game_id = g.id
        WHERE s.id = ?
    ''', (skin_id,))
    
    row = cursor.fetchone()
    if row is None:
        return jsonify({'error': 'Товар не найден'}), 404
    
    skin = dict(row)
    skin['game'] = {
        'id': skin['game_id'],
        'name': skin['game_name'],
        'logo': skin['game_logo']
    }
    del skin['game_id']
    del skin['game_name']
    del skin['game_logo']
    
    conn.close()
    return jsonify(skin)

@app.route('/api/user/<user_id>/avatar', methods=['POST', 'OPTIONS'])
def update_avatar(user_id):
    if request.method == 'OPTIONS':
        return handle_options()
        
    if 'file' not in request.files:
        return jsonify({'error': 'Файл не найден'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Файл не выбран'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{str(uuid.uuid4())}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            'UPDATE users SET avatar = ? WHERE id = ?',
            (f"/uploads/{unique_filename}", user_id)
        )
        
        conn.commit()
        
        cursor.execute(
            'SELECT id, username, email, avatar, favorites, created_at FROM users WHERE id = ?',
            (user_id,)
        )
        user = dict(cursor.fetchone())
        
        conn.close()
        
        return jsonify(user)
    
    return jsonify({'error': 'Недопустимый тип файла'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

def handle_options():
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)