from flask import Flask, render_template, request
import requests
import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    page = 1
    universe_data = requests.get(f'https://swapi.co/api/planets/?page={page}').json()
    planets = data_manager.format_planet_data(universe_data)

    return render_template('index.html', planets=planets, page=page)


if __name__ == '__main__':
    app.debug = True
    app.run()
