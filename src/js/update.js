import {bookDetail, getBookInfo} from "./bookDetail";
import {getBooks, token} from "./books";

const updateBook = document.querySelector(".update--book")
const radios = updateBook.querySelectorAll('[type="radio"]')
const updateForm = document.querySelector('.update--form')
const updateBookName = document.querySelector('#bookName')
const updateBookAuthor = document.querySelector('#bookAuthor')
const inputs = updateBook.querySelectorAll('[type="text"],[type="number"]')
const updateClose = document.querySelector('.update-close')


let dataId = ''

export function changeBook(data) {
    updateBook.classList.add('update-visible')

    console.log(inputs)
    inputs.forEach(field => {
        field.value = data[field.name]
    })
    if (data.isFavorite) {
        radios[0].checked = true
    } else {
        radios[1].checked = true
    }
    dataId = data.id
}


let updatedBook = {}

updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkUpdatedFields()
    if (updatedBook.name && updatedBook.author) {
        inputs.forEach(field => {

            if (field.name === 'publishYear') {
                updatedBook.publishYear = Number(field.value)
            } else if (field.name === 'genres') {
                updatedBook.genres = [field.value]
            } else if (field.name === 'pagesNumber') {
                updatedBook.pagesNumber = Number(field.value)
            }
        })
        const checkedRadio = updateBook.querySelector('[type="radio"]:checked')
        if (checkedRadio.id === "book-no") {
            updatedBook.isFavorite = false
        } else {
            updatedBook.isFavorite = true
        }
        updateBookApi(updatedBook, dataId)
    }
    bookDetail.classList.add('visible')
    updateBook.classList.remove('update-visible')
})


function checkUpdatedFields() {
    const updateBookNameValue = updateBookName.value.trim()
    const updateBookAuthorValue = updateBookAuthor.value.trim()


    if (updateBookNameValue === '') {
        setBookError(updateBookName, 'error-message')
    } else {
        setBookSuccess(updateBookName, 'error-message')
        setSuccessBook(updateBookName)

    }

    if (updateBookAuthorValue === '') {
        setBookError(updateBookAuthor, 'error-message')
    } else {
        setBookSuccess(updateBookAuthor, 'error-message')
        setSuccessBook(updateBookAuthor)
    }
}

const setBookError = (book, message) => {
    const errorSpan = book.parentElement.querySelector('.update--form__error-message')
    errorSpan.classList.add(message)
    book.classList.add('input-error')
}

const setBookSuccess = (book, message) => {
    const errorSpan = book.parentElement.querySelector('.update--form__error-message')
    errorSpan.classList.remove(message)
    book.classList.remove('input-error')
}

function setSuccessBook(book) {
    updatedBook = {...updatedBook, [book.name]: book.value}
    console.log(updatedBook)
}


async function updateBookApi(newBook, id) {

    try {
        const response = await fetch(`http://localhost:1717/books/update/${id}`, {
            method: "PUT",

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "X-Auth": `${token}`
            },
            body: JSON.stringify(newBook),
        });
        const data = await response.json()
        console.log(data)
        getBooks()
        getBookInfo(data.id)

    } catch (error) {
        console.log("Couldn't fetch", error.message)
    }
}


updateClose.addEventListener('click', () => {
    bookDetail.classList.add('visible')
    updateBook.classList.remove('update-visible')

})