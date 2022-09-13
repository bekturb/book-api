import {books} from "./books";
import {getBooks, token} from "./books";


const createForm  = document.querySelector('.create--form')
const bookName  = document.querySelector('#name')
const bookAuthor  = document.querySelector('#author')
const radioButtons = document.querySelectorAll('.isFavoriteInput')
const createNewBook  = document.querySelector('.create--book')
const xmark  = document.querySelector('.close-mark')

export const addBook = () => {
    createNewBook.classList.add('create-visible')

}

let newBook = {}
const newBookFields = ["publish--year","publish--house","original-language","genres","page"]

createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkCreateFields()
    if (newBook.name && newBook.author) {
        newBookFields.forEach(el => {
            const field = document.querySelector(`#${el}`)

             if (field.name === 'publishYear'){
                newBook.publishYear = Number(field.value)
            }else if(field.name === 'genres'){
                newBook.genres = [field.value]
            }else if(field.name === 'pagesNumber'){
                 newBook.pagesNumber = Number(field.value)
            }else{
                 setSuccessBook(field)
             }
        })

        radioButtons.forEach(button => {
            if (button.checked === true){
                newBook.isFavorite = Boolean(Number(button.value))
            }
        })
        newBookApi(newBook)
    }
})


function checkCreateFields() {
    const bookNameValue = bookName.value.trim()
    const bookAuthorValue = bookAuthor.value.trim()



    if (bookNameValue === '') {
        setBookError(bookName, 'error-message')
    } else {
        setBookSuccess(bookName, 'error-message')
        setSuccessBook(bookName)

    }

    if (bookAuthorValue === '') {
        setBookError(bookAuthor, 'error-message')
    } else {
        setBookSuccess(bookAuthor, 'error-message')
        setSuccessBook(bookAuthor)
    }
}

function setBookError(book, message) {
    const errorSpan = book.parentElement.querySelector('.create--form__error-message')
    errorSpan.classList.add(message)
    book.classList.add('input-error')
}

function setBookSuccess(book, message) {
    const errorSpan = book.parentElement.querySelector('.create--form__error-message')
    errorSpan.classList.remove(message)
    book.classList.remove('input-error')
}

function setSuccessBook(book) {

        newBook = {...newBook, [book.name]: book.value}
    console.log(newBook)
}


const newBookApi = async (newBook) => {

    try {
        const response = await fetch("http://localhost:1717/books/create", {
            method: "POST",

            body: JSON.stringify(newBook),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "X-Auth": `${token}`
            }
        });
        if (response.ok === false) {
            console.log(404)
        } else {
            setTimeout(() => {
                location.assign("/books.html")
            }, 500)
        }
        const data = await response.json()
        console.log(data)
        getBooks()

    } catch (error) {
        console.log("Couldn't fetch", error.message)
    }
}



xmark.addEventListener("click", () => {
    createNewBook.classList.remove('create-visible')
    books.classList.remove('books--visible')
})