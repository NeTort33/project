
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
CORS(app)

games = [
    {"id": "1", "name": "Dota 2", "image_url": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg", "description": "MOBA от Valve"},
    {"id": "2", "name": "CS2", "image_url": "https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_social.jpg", "description": "Шутер от первого лица"}
]

skins = [
    {
        "id": 1,
        "name": "Dragon Claw Hook",
        "game_id": "1",
        "price": 13999,
        "type": "Hook",
        "hero": "Pudge",
        "rarity": "Immortal",
        "image_url": "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXK9QlSPcU4vBxaSV7eRvG5mM7BUFx6JEtdo72KLU5n7PvBZW4Su4mzxNHSlK-lY-iCwzsB65Vy0rvCoY6m2Qe1qUY6Z2z1I9CRJw8_aQmB5BHg/360fx360f"
    },
    {
        "id": 2,
        "name": "AWP Dragon Lore",
        "game_id": "2",
        "price": 249999,
        "type": "AWP",
        "rarity": "Covert",
        "image_url": "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5URuYz_7JYbBJFVqMF7U_1i-wu_vhp_u6Z_BnXs17yhx4ynZmxO3n1gSOREfqFtk/360fx360f"
    },
    {
        "id": 3,
        "name": "Arcana Shadow Fiend",
        "game_id": "1",
        "price": 29999,
        "type": "Arcana",
        "hero": "Shadow Fiend",
        "rarity": "Arcana",
        "image_url": "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXK9QlSPcUorA5OA1jVSvSoxNvsW1h4KEtNs6-2FAZy0PLGcHNHtIvhkdXZk_Xwa77SwWoFvsMl3rCRoImi3VDl-UNrZ2HzJ4fGclA6YV3S-lK8w-y915Ki_MOe19ZplQE/360fx360f"
    }
]

@app.route('/')
def home():
    featured_skins = skins[:4]
    return render_template('index.html', featured_skins=featured_skins, games=games)

@app.route('/dota2')
def dota2():
    return catalog(game_id="1")

@app.route('/cs2')
def cs2():
    return catalog(game_id="2")

@app.route('/catalog')
def catalog(game_id=None):
    if game_id is None:
        game_id = request.args.get('game', 'all')
    search = request.args.get('search', '').lower()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    
    filtered_skins = skins
    
    if game_id != 'all':
        filtered_skins = [s for s in filtered_skins if s['game_id'] == game_id]
    
    if search:
        filtered_skins = [s for s in filtered_skins if search in s['name'].lower()]
    
    if min_price is not None:
        filtered_skins = [s for s in filtered_skins if s['price'] >= min_price]
    
    if max_price is not None:
        filtered_skins = [s for s in filtered_skins if s['price'] <= max_price]
    
    return render_template('catalog.html', skins=filtered_skins, current_game=game_id, games=games)

@app.route('/api/skins')
def get_skins():
    game_id = request.args.get('game')
    if game_id:
        filtered_skins = [skin for skin in skins if skin['game_id'] == game_id]
        return jsonify(filtered_skins)
    return jsonify(skins)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
