
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
CORS(app)

# Mock data
games = [
    {"id": 1, "name": "Dota 2", "description": "MOBA от Valve"},
    {"id": 2, "name": "CS2", "description": "Шутер от первого лица"}
]

skins = [
    {
        "id": 1,
        "name": "Dragon Claw Hook",
        "game_id": 1,
        "price": 13999,
        "image_url": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXK9QlSPcUorA5OA1jVSvSoxNvsW1h4KEtNs6-2FAZy0PLGcHNHtIvhkdXZk_Xwa77SwWoFvsMl3rCRoImi3VDl-UNrZ2HzJ4fGclA6YV3S-lK8w-y915Ki_MOe19ZplQE"
    },
    {
        "id": 2,
        "name": "AWP Dragon Lore",
        "game_id": 2,
        "price": 249999,
        "image_url": "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5URuYz_7JYbBJFVqMF7U_1i-wu_vhp_u6Z_BnXs17yhx4ynZmxO3n1gSOREfqFtk"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/catalog')
def catalog():
    return render_template('catalog.html', skins=skins)

@app.route('/api/games')
def get_games():
    return jsonify(games)

@app.route('/api/skins')
def get_skins():
    return jsonify(skins)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
