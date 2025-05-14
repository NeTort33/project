
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
CORS(app)

# Types/Models
class Game:
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description

class Skin:
    def __init__(self, id, name, game_id, price, image_url):
        self.id = id
        self.name = name
        self.game_id = game_id
        self.price = price
        self.image_url = image_url

# Mock data
games = []
skins = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/catalog')
def catalog():
    return render_template('catalog.html')

@app.route('/api/games')
def get_games():
    return jsonify([vars(game) for game in games])

@app.route('/api/skins')
def get_skins():
    return jsonify([vars(skin) for skin in skins])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
