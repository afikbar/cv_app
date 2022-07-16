from datetime import datetime
import json
from pathlib import Path
from flask import Flask, render_template, request, redirect, url_for, send_from_directory


app = Flask(__name__)


@app.route('/')
def index():
    with Path(app.root_path, 'static', 'cards.json').open() as f:
        cards = json.load(f)
    return render_template('index.html', cards=cards)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(Path(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == '__main__':
   app.run()