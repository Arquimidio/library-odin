import makeElement from "./makeElement.js";
const bookDisplay = document.querySelector('.booklist');
const bookForm = document.getElementById('book-form');
const showForm = document.getElementById('add-book-form-btn');
const hideForm = document.getElementById('close-form-btn');
const readBtn = document.getElementById('form-read-btn')

/* Starts a new index for localstorage if it doesn't have one */
if(!localStorage.getItem('index')){
    localStorage.setItem('index', 0);
}

/* Creates a book object */
function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead? true : false;
}

/* Transforms a number inside a string into a boolean (mainly to be used with 0 and 1)*/
function strToBol(str) {
    return Boolean(Number(str));
}

/* Gets the current index from the local storage */
function getCurIndex() {
    return localStorage.getItem('index');
}

/* Gets a single book from the local storage */
function getSingleBook(id) {
    return JSON.parse(localStorage.getItem(id));
}

/* Sets a single book in the local storage */
function setBook(id, book) {
    localStorage.setItem(id, JSON.stringify(book));
    return book;
}

/* Gets all the books stored in the local storage */
function getAllBooks() {
    return Object.entries(localStorage)
        .filter(entry => entry[0] !== 'index')
        .map(entry => [entry[0], JSON.parse(entry[1])]);
}

/* Changes localStorage index to an updated value */
function changeIndex(newVal) {
    localStorage.setItem('index', newVal);
}

/* Returns the reading state of a book based on a given boolean */
function getReadText(bool) {
    return bool? 'Read' : 'Not Read';
}

/* Adds book to the library array */
function addBookToLibrary(book) {
    const newIndex = Number(getCurIndex()) + 1;
    setBook(newIndex, book);
    changeIndex(newIndex + 1);
    return newIndex;
}

/* Creates the necessary elements to display a book with HTML */
function displaySingleBook([id, { title, author, pages, wasRead }]) {
    const titleH2 = makeElement({ type: 'h2', text: title });
    const authorP = makeElement({ type: 'p', text: author, className: 'author' });
    const pagesP = makeElement({ type: 'p', text: `${pages} pages` });

    const listItem = makeElement({ 
        type: 'li', 
        parent: bookDisplay,
        dataset: { id },
        className: 'book'
    });

    const wasReadButton = makeElement({
        type: 'button',
        className: 'check-read',
        dataset: { wasRead: Number(wasRead) },
        text: getReadText(wasRead),
        listeners: { click: changeReadState }
    });

    const removeBook = makeElement({
        type: 'button',
        text: 'Delete',
        listeners: { click: deleteBook }
    });


    listItem.append(
        titleH2, 
        authorP, 
        pagesP, 
        wasReadButton, 
        removeBook
    );
}

/* Displays all the books from the given array */
function displayBooks(bookArray) {
    bookArray.forEach(displaySingleBook);
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