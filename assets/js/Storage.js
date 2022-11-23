export default class Storage {
  constructor() {
    /* Starts a new index for localstorage if it doesn't have one */
    if(!localStorage.getItem('index')){
        localStorage.setItem('index', 0);
    }
  }
  /* Transforms a number inside a string into a boolean (mainly to be used with 0 and 1)*/
  static strToBol(str) {
      return Boolean(Number(str));
  }

  /* Gets the current index from the local storage */
  static getCurIndex() {
      return localStorage.getItem('index');
  }

  /* Gets a single book from the local storage */
  static getSingleBook(id) {
      return JSON.parse(localStorage.getItem(id));
  }

  /* Parses received book from localStorage to JSON */
  static parseBook([prop, val]) {
      return [prop, JSON.parse(val)];
  }

  /* Filter the received book entries (removing the index entry)*/
  static filterBookEntries([prop]) {
      return prop !== 'index';
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

  static removeBook(id) {
      localStorage.removeItem(id);
  }

  /* Creates an index for the book, stores it in the localStorage and updates the current index */
  static storeBook(book) {
      const newIndex = Number(localStorage.getCurIndex()) + 1;
      localStorage.setBook(newIndex, book);
      localStorage.changeIndex(newIndex + 1);
      return newIndex;
  }

  /* Changes localStorage index to an updated value */
  static changeIndex(newVal) {
      localStorage.setItem('index', newVal);
  }
}