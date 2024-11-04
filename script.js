const myLibrary = [];
const library = document.querySelector(".library");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks(){
    let index = 0;
    for(let book of myLibrary){
        let row = document.createElement("div");
        row.classList.add("book");
        row.setAttribute("data-attribute", index);

        let header = document.createElement("h2");
        header.textContent = book.title;
        row.appendChild(header);

        let author = document.createElement("h3");
        author.textContent = book.author;
        row.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = book.pages;
        row.appendChild(pages);

        let read = document.createElement("p");
        read.textContent = book.read ? "Yes" : "No";
        row.appendChild(read);

        let button = document.createElement("button");
        button.textContent = book.read ? "Mark unread" : "Mark read";
        row.appendChild(button);

        library.appendChild(row);
        index++;
    }
}

//test
addBookToLibrary("the hobbit", "jr tolkien", 100);
addBookToLibrary("the hobbit 2", "jr tolkien", 200);
addBookToLibrary("lord of the rings", "jr tolkien", 500);
console.log(myLibrary);

displayBooks();