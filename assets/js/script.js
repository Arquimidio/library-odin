const storedBooks = [];
const bookDisplay = document.querySelector('.booklist');
const bookForm = document.getElementById('book-form');
const showForm = document.getElementById('add-book-form-btn');
const hideForm = document.getElementById('close-form-btn');

/* Creates a book object */
function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead? true : false;
}

/* Adds book to the library array */
function addBookToLibrary(book) {
    storedBooks.push(book);
}

/* Creates the necessary elements to display a book with HTML */
function displaySingleBook({ title, author, pages, wasRead }, id) {
    const listItem = document.createElement('li');
    const titleH2 = document.createElement('h2');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    const wasReadLabel = document.createElement('label');
    const wasReadBox = document.createElement('input');
    const removeBook = document.createElement('button');

    wasReadBox.type = 'checkbox';
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
    addBookToLibrary(newBook);
    displaySingleBook(newBook, storedBooks.length);
    form.reset();
    hideBookForm();
}

/* Deletes selected book based on it's id in the book storage */
function deleteBook(event) {
    const { parentElement: book } = event.target;
    const { id } = book.dataset;
    storedBooks[id] = null;
    book.remove();
}

showForm.addEventListener('click', displayBookForm);
hideForm.addEventListener('click', hideBookForm);
bookForm.addEventListener('submit', submitBook);

const lotr = new Book(
    'Lord of the Rings',
    'Tolkien',
    '1000',
    true
);

addBookToLibrary(lotr);
displayBooks(storedBooks);