import Book from './Book.js'
import Storage from './Storage.js'
import Form from './Form.js'
import Helper from './Helper.js';
import makeElement from './makeElement.js';


export default class Library {
  constructor() {
      this.bookDisplay = document.querySelector('.booklist');
      this.LibForm = new Form();

      this.displayBooks(Storage.getAllBooks());
      this.LibForm.form.addEventListener('submit', this.addBook.bind(this));
  }

  /*Gets the data from the new book form and adds it as a new book to the stored books*/
    addBook(event) {
        event.preventDefault();
        const { target: form } = event;
        const formData = new FormData(form);
        const readState = this.LibForm.readBtn.dataset.wasread;
        const newBook = new Book(...formData.values(), Helper.strToBol(readState));
        const index = Storage.storeBook(newBook);
        this.displaySingleBook([index, newBook]);
        this.LibForm.form.reset();
        this.LibForm.hideBookForm();
    }

    deleteBook(event) {
        const { parentElement: book } = event.target;
        const { id } = book.dataset;
        Storage.removeBook(id);
        book.remove();
    }

    changeBookReadState(event) {
        const { target: button } = event;
        const { parentElement: bookElement } = button;
        const { id } = bookElement.dataset;
        Storage.toggleProp('wasRead', id);
        this.LibForm.changeReadState(event);
    }

  /* Creates the necessary elements to display a book with HTML */
  displaySingleBook([id, { title, author, pages, wasRead }]) {
      const book = makeElement({ 
          type: 'li', 
          parent: this.bookDisplay,
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
                  text: Helper.getReadText(wasRead),
                  listeners: { click: this.changeBookReadState.bind(this) }
              },
              {
                  type: 'button',
                  text: 'Delete',
                  listeners: { click: this.deleteBook.bind(this) }
              }
          ]
      })

      return book;
  }

  /* Displays all the books from the given array */
  displayBooks(bookArray) {
      bookArray.forEach(this.displaySingleBook.bind(this));
  }
}