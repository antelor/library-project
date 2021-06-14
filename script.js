function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    newBook.info();

    myLibrary.push(newBook);
}

function showLibrary(){
    for (let i=0; i<myLibrary.length; i++){
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.textContent = myLibrary[i].info();
        
        bookListDiv.append(bookDiv);
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
            if(radios[i].value=='read')    dataArray.push('read');
            if(radios[i].value=='not-read')dataArray.push('not-read');
            break;
        }
    }

    let newBook = new Book(dataArray[0], dataArray[1], dataArray[2], dataArray[3]);
    addBookToLibrary(dataArray);

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.textContent = newBook.info();
    
    bookListDiv.append(bookDiv);
    
    document.querySelector('[class=form-popup').style.display = "none";
}

let myLibrary = [];
const bookListDiv = document.querySelector('[class=bookList]');
let testBook = new Book('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');
console.log(testBook.info());

addBookToLibrary('Chistes de Gallegos', 'Pepe Mujica', '124', 'already read');
addBookToLibrary('Chistes de Gallegos 2', 'Pepe Mujica', '124', 'not read');
showLibrary();

const bookForm = document.querySelector('form[name="bookForm"]');
