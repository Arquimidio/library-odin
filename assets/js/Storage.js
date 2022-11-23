export default class Storage {
  constructor() {
    /* Starts a new index for localstorage if it doesn't have one */
    if(!localStorage.getItem('index')){
        localStorage.setItem('index', 0);
    }
  }

  /* Gets the current index from the local storage */
  static getCurIndex() {
      return localStorage.getItem('index');
  }

  static nextIndex() {
    return Number(this.getCurIndex()) + 1;
   }

  /* Parses received book from localStorage to JSON */
  static parseBook([prop, val]) {
      return [prop, JSON.parse(val)];
  }

  /* Filter the received book entries (removing the index entry)*/
  static filterBookEntries([prop]) {
      return prop !== 'index';
  }

  
    /* Gets a single book from the local storage */
    static getSingleBook(id) {
        return JSON.parse(localStorage.getItem(id));
    }

  /* Gets filtered book entries (removing index entry) from localStorage */
  static getBookEntries() {
      const entries = Object.entries(localStorage);
      return entries.filter(this.filterBookEntries.bind(this));
  }

  /* Gets all books already parsed from the localStorage */
  static getAllBooks() {
      const bookEntries = this.getBookEntries();
      const books = bookEntries.map(this.parseBook.bind(this));
      return books;
  }

  

  /* Adds book to the localStorage */
  static setBook(id, book) {
      localStorage.setItem(id, JSON.stringify(book));
      return book;
  }

    /* Changes localStorage index to an updated value */
    static updateIndex(index) {
        localStorage.setItem('index', index || this.nextIndex());
    }

    /* Creates an index for the book, stores it in the localStorage and updates the current index */
    static storeBook(book) {
        const newIndex = this.nextIndex();
        this.setBook(newIndex, book);
        this.updateIndex(newIndex);
        return newIndex;
    }

    static removeBook(id) {
        localStorage.removeItem(id);
    }

    static toggleProp(propName, itemId) {
        const bookData = this.getSingleBook(itemId);
        bookData[propName] = !bookData[propName];
        this.setBook(itemId, bookData);
    }
}