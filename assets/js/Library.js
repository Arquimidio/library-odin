import Book from './Book.js'
import Storage from './Storage.js'
import Form from './Form.js'
import makeElement from './makeElement.js';

export default class Library {
  constructor() {
      this.bookDisplay = document.querySelector('.booklist');
  }

  /* Creates the necessary elements to display a book with HTML */
  displaySingleBook([id, { title, author, pages, wasRead }]) {
      const book = makeElement({ 
          type: 'li', 
          parent: bookDisplay,
          dataset: { id },
          attr: { class: 'book' },
          children: [
              { 
                  type: 'h2', 
                  text: title 
              },
              { 
                  type: 'p', 
                  text: author, 
                  attr: { class: 'author' } 
              },
              { 
                  type: 'p', 
                  text: `${pages} pages` 
              },
              {
                  type: 'button',
                  attr: { class: 'check-read' },
                  dataset: { wasread: Number(wasRead) },
                  text: getReadText(wasRead),
                  listeners: { click: changeReadState }
              },
              {
                  type: 'button',
                  text: 'Delete',
                  listeners: { click: deleteBook }
              }
          ]
      })
      return book;
  }

  /* Displays all the books from the given array */
  displayBooks(bookArray) {
      bookArray.forEach(displaySingleBook);
  }

  deleteBook(event) {
      const { parentElement: book } = event.target;
      const { id } = book.dataset;
      Storage.removeBook(id);
      book.remove();
  }
}