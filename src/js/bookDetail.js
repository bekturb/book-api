
import  {books, token} from "./books";
import {changeBook} from "./update";

export const bookDetail = document.querySelector('.books--detail')
const card = document.querySelector('.detail--card')
const button = document.querySelector('.books--detail__button')
const close = document.querySelector('.fa-xmark')



export function showBookDetail(id) {
    bookDetail.classList.add('visible')
    getBookInfo(id)
}

export function getBookInfo (id) {



    fetch(`http://localhost:1717/books/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "X-Auth": `${token}`
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            setBookItems(data)

        })
        .catch(error => {
            console.log(error)
        })
}

function setBookItems (data) {
    card.innerHTML = ''

    const cardTitle = document.createElement('h1')
    cardTitle.setAttribute('class', 'detail--card__title')
    cardTitle.append(`${data.name}`)

    const cardAuthor = document.createElement('p')
    cardAuthor.setAttribute('class', 'detail--card__author')
    cardAuthor.append(`${data.author}`)

    const booksInner = document.createElement('div')
    booksInner.setAttribute('class', 'books--inner')


    const publishHouse = document.createElement('p')
    publishHouse.setAttribute('class', 'books--inner__publishHouse')
    publishHouse.append(`Издательство:  ${data.publishHouse}`)

    const publishYear = document.createElement('p')
    publishYear.setAttribute('class', 'books--inner__publishYear')
    publishYear.append(`Год издания:  ${data.publishYear}`)

    const genres = document.createElement('p')
    genres.setAttribute('class', 'books--inner__genres')
    genres.append(`Жанры:  ${data.genres}`)


    const originalLanguage = document.createElement('p')
    originalLanguage.setAttribute('class', 'books--inner__originalLanguage')
    originalLanguage.append(`Язык оригинала:  ${data.originalLanguage}`)

    const pagesNumber = document.createElement('p')
    pagesNumber.setAttribute('class', 'books--inner__pagesNumber')
    pagesNumber.append(`Количество страниц:  ${data.pagesNumber}`)


    booksInner.append(publishHouse,originalLanguage,publishYear,pagesNumber,genres)
    card.append(cardTitle,cardAuthor,booksInner)

    button.addEventListener('click', () => {
        bookDetail.classList.remove('visible')
        changeBook(data)
    })
}


close.addEventListener('click', () => {
    bookDetail.classList.remove('visible')
    books.classList.remove('books--visible')
})