const bookDisplay = document.querySelector('.booklist');
const bookForm = document.getElementById('book-form');
const showForm = document.getElementById('add-book-form-btn');
const hideForm = document.getElementById('close-form-btn');

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

function changeIndex(newVal) {
    localStorage.setItem('index', newVal);
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
    const listItem = document.createElement('li');
    const titleH2 = document.createElement('h2');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    const wasReadLabel = document.createElement('label');
    const wasReadBox = document.createElement('input');
    const removeBook = document.createElement('button');

    wasReadBox.type = 'checkbox';
    wasReadBox.className = 'check-read'
    wasReadBox.checked = wasRead;

    [
        titleH2.textContent,
        authorP.textContent,
        pagesP.textContent,
        wasReadLabel.textContent,
        removeBook.textContent
    ] = [
        title,
        author,
        pages,
        'Was read: ',
        'Delete book'
    ]

    listItem.append(
        titleH2, 
        authorP, 
        pagesP, 
        wasReadLabel, 
        wasReadBox, 
        removeBook
    );

    removeBook.addEventListener('click', deleteBook);
    wasReadBox.addEventListener('input', toggleReadState);

    listItem.dataset.id = id;
    listItem.className = 'book';

    bookDisplay.append(listItem);
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

/*Gets the data from the new book form and adds it as a new book to the stored books*/
function submitBook(event) {
    event.preventDefault();
    const { target: form } = event;
    const formData = new FormData(form);
    const newBook = new Book(...formData.values());
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

function toggleReadState(event) {
    const { target: checkbox } = event;
    const { parentElement: bookElement } = checkbox;
    const { id } = bookElement.dataset;
    const bookData = getSingleBook(id);
    bookData.wasRead = checkbox.checked;
    setBook(id, bookData);
}

showForm.addEventListener('click', displayBookForm);
hideForm.addEventListener('click', hideBookForm);
bookForm.addEventListener('submit', submitBook);

displayBooks(getAllBooks());