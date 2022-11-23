import Helper from "./Helper.js";

export default class Form {
    constructor() {
        this.form = document.getElementById('book-form');
        this.showBtn = document.getElementById('add-book-form-btn');
        this.hideBtn = document.getElementById('close-form-btn');
        this.readBtn = document.getElementById('form-read-btn');

        this.showBtn.addEventListener('click', this.displayBookForm.bind(this));
        this.hideBtn.addEventListener('click', this.hideBookForm.bind(this));
        this.form.addEventListener('click', this.hideBookFormOnClickOut.bind(this));
        this.readBtn.addEventListener('click', this.changeReadState.bind(this));
    }

    /* Displays the form for adding new books */
    displayBookForm() {
        this.form.classList.remove('hide');
    }

    /* Hides the form for adding new books */
    hideBookForm() {
        this.form.classList.add('hide');
    }

    /* Hides the form when the users click out of the form area*/
    hideBookFormOnClickOut(event) {
        if(event.target === event.currentTarget) {
            this.hideBookForm();
        } 
    }

    /* Changes the state of the read button based on dataset attribute*/
    changeReadState({ target: button }) {
        const { wasread } = button.dataset;
        const readState = Number(wasread)
        const newReadState = Number(!readState)
        button.dataset.wasread = newReadState;
        button.textContent = Helper.getReadText(newReadState);
    }
}