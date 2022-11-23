/* Creates a book object using a class */
export default class Book {
  constructor(title, author, pages, wasRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.wasRead = wasRead? true : false;
  }
}