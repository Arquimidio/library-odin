const bookForm = document.getElementById('book-form');
const showForm = document.getElementById('add-book-form-btn');
const hideForm = document.getElementById('close-form-btn');
const readBtn = document.getElementById('form-read-btn')

/* Starts a new index for localstorage if it doesn't have one */
if(!localStorage.getItem('index')){
    localStorage.setItem('index', 0);
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


showForm.addEventListener('click', displayBookForm);
hideForm.addEventListener('click', hideBookForm);
bookForm.addEventListener('submit', submitBook);
bookForm.addEventListener('click', hideBookFormOnClickOut)
readBtn.addEventListener('click', changeReadState);

displayBooks(getAllBooks());