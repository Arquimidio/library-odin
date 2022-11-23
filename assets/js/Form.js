export default class Form {
    constructor() {
        this.element = document.getElementById('book-form');
        this.showBtn = document.getElementById('add-book-form-btn');
        this.hideBtn = document.getElementById('close-form-btn');
        this.readBtn = document.getElementById('form-read-btn');
    }

    /* Hides the form for adding new books */
    hideBookForm() {
        bookForm.classList.add('hide');
    }

    /* Hides the form when the users click out of the form area*/
    hideBookFormOnClickOut(event) {
        if(event.target === event.currentTarget) {
            this.hideBookForm();
        } 
    }

    /* Displays the form for adding new books */
    displayBookForm() {
        bookForm.classList.remove('hide');
    }
}