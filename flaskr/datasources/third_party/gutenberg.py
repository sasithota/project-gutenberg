import requests
from bs4 import BeautifulSoup


def get_book_text(book_id):
    response = requests.get(f'https://www.gutenberg.org/cache/epub/{book_id}/pg{book_id}.txt')
    return response.text


def get_book_metadata(book_id):
    response = requests.get(f'https://www.gutenberg.org/ebooks/{book_id}')
    soup = BeautifulSoup(response.content, 'html.parser')
    return {
        "author": soup.find('a', {'itemprop': 'creator'}).text,
        "title": soup.find('td', {'itemprop': 'headline'}).text,
        "language": soup.find('tr', {'itemprop': 'inLanguage'}).find('td').text,
        "date_published": soup.find('td', {'itemprop': 'datePublished'}).text,
    }


