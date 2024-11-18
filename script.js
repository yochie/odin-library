const libraryDOM = document.querySelector(".library");
const formSection = document.querySelector(".form-section");
const bookForm = document.querySelector(".book-form")
const displayForm = document.querySelector(".display-form");

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    books;

    constructor() {
        this.books = [];
    }

    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook);
    }

    remove(id) {
        this.books.splice(id, 1);
    }

    toggleRead(id) {
        this.books[id].toggleRead();
    }

}
const myLibrary = new Library();

function displayBooks() {
    let children = [];
    let index = 0;
    for (let book of myLibrary.books) {
        let row = document.createElement("div");
        row.classList.add("book");

        let header = document.createElement("h2");
        header.textContent = book.title;
        row.appendChild(header);

        let author = document.createElement("h3");
        author.textContent = `by: ${book.author}`;
        row.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        row.appendChild(pages);

        let read = document.createElement("p");
        read.textContent = `Read: ${book.read ? "Yes" : "No"}`;
        row.appendChild(read);

        let buttonList = document.createElement("div");
        buttonList.classList.add("button-list");

        let readButton = document.createElement("button");
        readButton.classList.add("read");
        readButton.textContent = book.read ? "Unread" : "Read";
        readButton.setAttribute("data-attribute", index);
        buttonList.appendChild(readButton);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-attribute", index);
        buttonList.appendChild(deleteButton);

        row.appendChild(buttonList);

        children.push(row);
        index++;
    }
    libraryDOM.replaceChildren(...children);
}

libraryDOM.addEventListener("click", (event) => {
    if (event.target.nodeName !== "BUTTON")
        return;

    const id = event.target.getAttribute("data-attribute");

    if (event.target.classList.contains("delete")) {
        myLibrary.remove(id);
    } else if (event.target.classList.contains("read")) {
        myLibrary.toggleRead(id);
    }

    displayBooks();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createBookFromForm();
    displayBooks();
});

displayForm.addEventListener("click", (event) => {
    toggleFormDisplay();
});

function toggleFormDisplay() {
    if (formSection.classList.contains("hide")) {
        formSection.classList.replace("hide", "display");
    } else {
        formSection.classList.replace("display", "hide");
    }
}

function createBookFromForm() {
    let formData = new FormData(bookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");
    myLibrary.addBookToLibrary(title, author, pages, read);
}

//test
myLibrary.addBookToLibrary("the hobbit", "jr tolkien", 100, true);
myLibrary.addBookToLibrary("the hobbit 2", "jr tolkien", 200);
myLibrary.addBookToLibrary("lord of the rings", "jr tolkien", 500);
console.log(myLibrary);

displayBooks();