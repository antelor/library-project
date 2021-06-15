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
    document.querySelector('.form-popup').classList.add('form-popup-transition');
    document.querySelector('.form-popup.form-popup-transition').classList.remove('form-popup');    
}

function closeForm() {
    let dataArray = Array.from(document.querySelectorAll('[class=bookForm] input'));
    dataArray = dataArray.map(input => input.value);
    //eliminar read not-read
    dataArray.pop();
    dataArray.pop();
    
    for(let i=0; i<dataArray.length; i++){
        if(dataArray[i]=='') return;
    }

    document.querySelectorAll('[class=bookForm] input').forEach(function(x, y){
        x.value='';
    });


    let radios = document.getElementsByName('read');

    for (let i = 0; i < radios.length; i++) {
        if(radios[i].id=="read" && radios[i].checked){
            console.log('a');
            dataArray.push("already read");
            break;
        }
        if(radios[i].id=="not-read" && radios[i].checked){
            console.log('a');
            dataArray.push("not read");
            break;
        }
    }

    let newBook = new Book(dataArray[0], dataArray[1], dataArray[2], dataArray[3]);
    addBookToLibrary(dataArray);

    bookListDiv.append( createBookDiv(newBook, myLibrary.length - 1) );

    document.querySelector('.form-popup-transition').classList.add('form-popup');
    document.querySelector('.form-popup-transition.form-popup').classList.remove('form-popup-transition');
}

let myLibrary = [];
const bookListDiv = document.querySelector('[class=bookList]');
let testBook = new Book('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');

addBookToLibrary('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');
addBookToLibrary('Chistes de Gallegos 2', 'Pepe Mujica', '124', 'not read');
showLibrary();

const bookForm = document.querySelector('form[name="bookForm"]');
