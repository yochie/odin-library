const myLibrary = [];
const libraryDOM = document.querySelector(".library");
const formSection = document.querySelector(".form-section");
const bookForm = document.querySelector(".book-form")
const displayForm = document.querySelector(".display-form");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    let children = [];
    let index = 0;
    for (let book of myLibrary) {
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
        myLibrary.splice(id, 1);
    } else if (event.target.classList.contains("read")) {
        myLibrary[id].toggleRead();
    }

    displayBooks();
});

bookForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    createBookFromForm();
    displayBooks();
});

displayForm.addEventListener("click", (event) => {
    toggleFormDisplay();
});

function toggleFormDisplay(){
    if(formSection.classList.contains("hide")){
        formSection.classList.replace("hide", "display");
    } else {
        formSection.classList.replace("display", "hide");
    }
}

function createBookFromForm(){
    let formData = new FormData(bookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");
    addBookToLibrary(title, author, pages, read);
}

//test
addBookToLibrary("the hobbit", "jr tolkien", 100, true);
addBookToLibrary("the hobbit 2", "jr tolkien", 200);
addBookToLibrary("lord of the rings", "jr tolkien", 500);
console.log(myLibrary);

displayBooks();