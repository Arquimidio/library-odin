import makeElement from "./makeElement.js";
const bookForm = document.getElementById('book-form');
const showForm = document.getElementById('add-book-form-btn');
const hideForm = document.getElementById('close-form-btn');
const readBtn = document.getElementById('form-read-btn')

/* Starts a new index for localstorage if it doesn't have one */
if(!localStorage.getItem('index')){
    localStorage.setItem('index', 0);
}

/* Creates a book object using a class */
class Book {
    constructor(title, author, pages, wasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.wasRead = wasRead? true : false;
    }
}

class BookStorage {
    constructor() {
        this.storage = localStorage;
    }

    /* Transforms a number inside a string into a boolean (mainly to be used with 0 and 1)*/
    strToBol(str) {
        return Boolean(Number(str));
    }

    /* Gets the current index from the local storage */
    getCurIndex() {
        return storage.getItem('index');
    }

    /* Gets a single book from the local storage */
    getSingleBook(id) {
        return JSON.parse(storage.getItem(id));
    }

    /* Parses received book from localStorage to JSON */
    parseBook([prop, val]) {
        return [prop, JSON.parse(val)];
    }

    /* Filter the received book entries (removing the index entry)*/
    filterBookEntries([prop]) {
        return prop !== 'index';
    }

    /* Gets filtered book entries (removing index entry) from localStorage */
    getBookEntries() {
        const entries = Object.entries(this.storage);
        return entries.filter(this.filterBookEntries.bind(this));
    }

    /* Gets all books already parsed from the localStorage */
    getAllBooks() {
        const bookEntries = this.getBookEntries();
        const books = bookEntries.map(this.parseBook.bind(this));
        return books;
    }

    /* Adds book to the localStorage */
    setBook(id, book) {
        storage.setItem(id, JSON.stringify(book));
        return book;
    }

    /* Creates an index for the book, stores it in the localStorage and updates the current index */
    storeBook(book) {
        const newIndex = Number(this.storage.getCurIndex()) + 1;
        this.storage.setBook(newIndex, book);
        this.storage.changeIndex(newIndex + 1);
        return newIndex;
    }

    /* Changes localStorage index to an updated value */
    changeIndex(newVal) {
        storage.setItem('index', newVal);
    }
}

class BookForm {
    constructor() {

    }
}

class Library {
    constructor() {
        this.Storage = new BookStorage();
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
}

/* Returns the reading state of a book based on a given boolean */
function getReadText(bool) {
    return bool? 'Read' : 'Not Read';
}

/* Displays the form for adding new books */
function displayBookForm() {
    bookForm.classList.remove('hide');
}

/* Hides the form for adding new books */
function hideBookForm() {
    bookForm.classList.add('hide');
}

/* Hides the form when the users click out of the form area*/
function hideBookFormOnClickOut(event) {
    if(event.target === event.currentTarget) {
        hideBookForm();
    } 
}

/* Changes the state of the read button based on dataset attribute*/
function changeReadState(event) {
    const { target: button } = event;
    const { wasread } = button.dataset;
    const readState = Number(wasread)
    const newReadState = Number(!readState)
    button.dataset.wasread = newReadState;
    button.textContent = getReadText(newReadState);

    if(!button.id) {
        const { parentElement: bookElement } = button;
        const { id } = bookElement.dataset;
        const bookData = getSingleBook(id);
        bookData.wasRead = Boolean(newReadState);
        setBook(id, bookData);
    }
}

/*Gets the data from the new book form and adds it as a new book to the stored books*/
function submitBook(event) {
    event.preventDefault();
    const { target: form } = event;
    const formData = new FormData(form);
    const readState = readBtn.dataset.wasread;
    const newBook = new Book(...formData.values(), strToBol(readState));
    const index = addBookToLibrary(newBook);
    displaySingleBook([index, newBook]);
    form.reset();
    hideBookForm();
}

/* Deletes selected book based on it's id in the book storage */
function deleteBook(event) {
    const { parentElement: book } = event.target;
    const { id } = book.dataset;
    localStorage.removeItem(id);
    book.remove();
}

showForm.addEventListener('click', displayBookForm);
hideForm.addEventListener('click', hideBookForm);
bookForm.addEventListener('submit', submitBook);
bookForm.addEventListener('click', hideBookFormOnClickOut)
readBtn.addEventListener('click', changeReadState);

displayBooks(getAllBooks());