const storedBooks = [];
const bookDisplay = document.querySelector('.booklist');

function Book(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
}

function addBookToLibrary(book) {
    storedBooks.push(book);
}

function displaySingleBook({ title, author, pages, wasRead }) {
    const listItem = document.createElement('li');
    const titleH2 = document.createElement('h2');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    const wasReadLabel = document.createElement('label');
    const wasReadBox = document.createElement('input');

    wasReadBox.type = 'checkbox';
    wasReadBox.checked = wasRead;

    [
        titleH2.textContent,
        authorP.textContent,
        pagesP.textContent,
        wasReadLabel.textContent
    ] = [
        title,
        author,
        pages,
        'Was read: '
    ]

    listItem.append(titleH2, authorP, pagesP, wasReadLabel, wasReadBox);
}

function displayBooks(bookArray) {
    bookArray.forEach(displaySingleBook);
}