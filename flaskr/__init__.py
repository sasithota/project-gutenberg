from flask import Flask
from flaskr.datamodels import create_table_if_not_exists
from flaskr.core import get_gutenberg_repository
from flaskr.text_analysis import get_plot_summary_analysis
import json

app = Flask(__name__)
with app.app_context():
    create_table_if_not_exists()


@app.route('/book/<int:book_id>', methods=['GET'])
def book(book_id):
    repository = get_gutenberg_repository()
    return json.dumps(repository.get_book(book_id))


@app.route('/recent-activity', methods=['GET'])
def recent_activity():
    repository = get_gutenberg_repository()
    return json.dumps(repository.get_recent_activity())


@app.route('/text-analysis/book/<int:book_id>', methods=['GET'])
def text_analysis(book_id):
    repository = get_gutenberg_repository()
    book_text = repository.get_book(book_id)['text']
    return json.dumps(get_plot_summary_analysis(book_text))



