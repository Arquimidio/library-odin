const storedBooks = [];
const bookDisplay = document.querySelector('.booklist');
const showForm = document.getElementById('add-book-form-btn')

/* Creates a book object */
function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
}

/* Adds book to the library array */
function addBookToLibrary(book) {
    storedBooks.push(book);
}

/* Creates the necessary elements to display a book with HTML */
function displaySingleBook({ title, author, pages, wasRead }) {
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
    bookDisplay.append(listItem);
}

/* Displays all the books from the given array */
function displayBooks(bookArray) {
    bookArray.forEach(displaySingleBook);
}

const lotr = new Book(
    'Lord of the Rings',
    'Tolkien',
    '1000',
    true
);

addBookToLibrary(lotr);
displayBooks(storedBooks);