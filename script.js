function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

Book.prototype.toggleRead = function(bookDiv){
    if(this.read=='already read') {
        this.read = 'not read';
        bookDiv.textContent = this.info();
    }
    else if(this.read=='not read'){
        this.read = 'already read';
        bookDiv.textContent = this.info();
    }
    createBookDivBtns(this, bookDiv);
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    newBook.info();

    myLibrary.push(newBook);
}

function createBookDivBtns(book, bookDiv){
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.classList.add('bookBtn');
    delBtn.addEventListener("click", () => {
        bookDiv.remove();
    })
    bookDiv.appendChild(delBtn);
    
    let readBtn = document.createElement("button");
    if(book.read == 'already read')    readBtn.innerHTML = "Not read";
    if(book.read == 'not read')    readBtn.innerHTML = "Finished";
    readBtn.classList.add('bookBtn');
    
    readBtn.addEventListener("click", () => {
        book.toggleRead(bookDiv);
    })

    bookDiv.appendChild(readBtn);
}

function createBookDiv(book, i){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('bookDiv');
    bookDiv.textContent = book.info();
    
    createBookDivBtns(book, bookDiv);

    return bookDiv;
}

function showLibrary(){
    for (let i=0; i<myLibrary.length; i++){
        bookListDiv.append( createBookDiv(myLibrary[i], i) );
    }
}

function openForm() {
    document.querySelector('[class=form-popup').style.display = "block";
}

function closeForm() {
    let dataArray = Array.from(document.querySelectorAll('[class=bookForm] input'));
    dataArray = dataArray.map(input => input.value);

    //eliminar read not-read
    dataArray.pop();
    dataArray.pop();

    var radios = document.getElementsByName('read');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            if(radios[i].value=='read')    dataArray.push('already read');
            if(radios[i].value=='not-read')dataArray.push('not read');
            break;
        }
    }

    let newBook = new Book(dataArray[0], dataArray[1], dataArray[2], dataArray[3]);
    addBookToLibrary(dataArray);

    bookListDiv.append( createBookDiv(newBook, myLibrary.length - 1) );
    
    document.querySelector('[class=form-popup').style.display = "none";
}

let myLibrary = [];
const bookListDiv = document.querySelector('[class=bookList]');
let testBook = new Book('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');

addBookToLibrary('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');
addBookToLibrary('Chistes de Gallegos 2', 'Pepe Mujica', '124', 'not read');
showLibrary();

const bookForm = document.querySelector('form[name="bookForm"]');
