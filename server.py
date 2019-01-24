from flask import Flask, render_template, request
import requests

app = Flask(__name__)


@app.route('/')
def index():
    universe_data = requests.get('https://swapi.co/api/planets/?page=1').json()
    planets = universe_data['results']
    for planet in planets:
        planet['diameter'] = format(int(planet['diameter']), ',d')
        planet['population'] = format(int(planet['population']), ',d') \
            if planet['population'] != 'unknown' else 'unknown'

    return render_template('index.html', planets=planets)


if __name__ == '__main__':
    app.debug = True
    app.run()
