
import {getBookInfo, showBookDetail} from './bookDetail'
import {setFavoriteBook} from './favoritesBook'
import {deleteBook} from './deleteBook'
import {addBook} from "./createBook";


const wrapper = document.querySelector('#wrapper')
export const books = document.querySelector('.books')
const userName = document.querySelector('.books__user')
const booksCorner = document.querySelector('.books__corner')
const booksItem = document.querySelector('.books__items')
const emptyMessage = document.querySelector('.empty-message')
const warningMessage = document.querySelector('.warning-message__title')
const addButton = document.querySelector('.books__button--add')
const logout = document.querySelector('.books__button--logout')


const user = localStorage .getItem('user')
export const token = localStorage.getItem('token')

userName.append(user)

logout.addEventListener("click",() => {
    localStorage.setItem('token',null)
    setTimeout(() => {
        location.assign('/index.html')
    },200)
})

export const getBooks = () => {
    wrapper.innerHTML = ''

    fetch("http://localhost:1717/books", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "X-Auth": `${token}`
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data === 'Access is denied') {
                bookVisible()
            } else if (data.length === 0) {
                noneBook()
            } else {
                data.forEach(book => {
                    const booksCard = document.createElement("div")
                    booksCard.setAttribute('class', "books__card")
                    wrapper.append(booksCard)

                    const booksInfo = document.createElement("div")
                    booksInfo.setAttribute('class', "books__info")
                    booksCard.append(booksInfo)

                    booksInfo.addEventListener('click', () => {
                        books.classList.add('books--visible')
                        showBookDetail(book.id)
                    })

                    const booksName = document.createElement("h2")
                    booksName.setAttribute('class', "books__book-name")
                    booksName.append(`${book.name}`)
                    booksInfo.append(booksName)

                    const booksAuthor = document.createElement("p")
                    booksAuthor.setAttribute('class', "books__book-author")
                    booksAuthor.append(`${book.author}`)
                    booksInfo.append(booksAuthor)

                    const booksFunc = document.createElement("div")
                    booksFunc.setAttribute('class', "books__func")
                    booksCard.append(booksFunc)

                    const likeIcon = document.createElement("i")
                    likeIcon.setAttribute('class', "fa-solid fa-heart")
                    booksFunc.append(likeIcon)

                    likeIcon.addEventListener('click', () => {
                        setFavoriteBook(likeIcon, book)
                    })

                    if (book.isFavorite === true){
                        likeIcon.style.color = 'red'
                    }else{
                        likeIcon.style.color = 'white'
                    }

                    const trashIcon = document.createElement("i")
                    trashIcon.setAttribute('class', "fa-solid fa-trash")
                    booksFunc.append(trashIcon)

                    trashIcon.addEventListener("click", () => {
                        deleteBook(book)
                    })
                })
            }
        })
        .catch(error => {
            console.log(error)
        })

}

getBooks()
function bookVisible () {
    booksCorner.classList.add('books__visible')
    booksItem.classList.add('books__visible')
    warningMessage.style.display ='block'
}

function noneBook () {
    booksCorner.classList.add('books__visible')
    booksItem.classList.add('books__visible')
    emptyMessage.style.display ='block'
}


addButton.addEventListener('click', () => {
    books.classList.add('books--visible')
    addBook()
})



// "books": [
//     {
//         "id": "tt2462gd3",
//         "name": "Гарри Поттер и философский камень",
//         "author": "Джоан Роулинг",
//         "isFavorite": false
//     },
//     {
//         "id": "373yyr74y",
//         "name": "Гарри Поттер и тайная комната",
//         "author": "Джоан Роулинг",
//         "isFavorite": false
//     },
//     {
//         "id": "56734jfjjf",
//         "name": "Охота на овец",
//         "author": "Харуки Мураками",
//         "isFavorite": false
//     },
//     {
//         "id": "74hg47wjuGG",
//         "name": "Война и мир",
//         "author": "Лев Толстой",
//         "isFavorite": false
//     },
//     {
//         "id": "36ggf64gd",
//         "name": "О дивный новый мир",
//         "author": "Олдос Хаксли",
//         "isFavorite": false
//     }
// ],
//     "books_expanded": [
//     {
//         "id": "tt2462gd3",
//         "name": "Гарри Поттер и философский камень",
//         "author": "Джоан Роулинг",
//         "isFavorite": false,
//         "publishYear": 1997,
//         "publishHouse": "Росмэн",
//         "pagesNumber": 399,
//         "genres": [
//             "Приключения",
//             "Фэнтези"
//         ],
//         "originalLanguage": "Английский"
//     },
//     {
//         "id": "373yyr74y",
//         "name": "Гарри Поттер и тайная комната",
//         "author": "Джоан Роулинг",
//         "isFavorite": false,
//         "publishYear": 1998,
//         "publishHouse": "Росмэн",
//         "pagesNumber": 480,
//         "genres": [
//             "Приключения",
//             "Фэнтези",
//             "Роман"
//         ],
//         "originalLanguage": "Английский"
//     },
//     {
//         "id": "56734jfjjf",
//         "name": "Охота на овец",
//         "author": "Харуки Мураками",
//         "isFavorite": false,
//         "publishYear": 1982,
//         "publishHouse": "Kodansha",
//         "pagesNumber": 448,
//         "genres": [
//             "Магический реализм",
//             "Роман"
//         ],
//         "originalLanguage": "Японский"
//     },
//     {
//         "id": "74hg47wjuGG",
//         "name": "Война и мир",
//         "author": "Лев Толстой",
//         "isFavorite": false,
//         "publishYear": 1865,
//         "publishHouse": "Эксмо",
//         "pagesNumber": 1300,
//         "genres": [
//             "Исторический роман",
//             "Роман"
//         ],
//         "originalLanguage": "Русский"
//     },
//     {
//         "id": "36ggf64gd",
//         "name": "О дивный новый мир",
//         "author": "Олдос Хаксли",
//         "isFavorite": false,
//         "publishYear": 1932,
//         "publishHouse": "Chatto & Windus",
//         "pagesNumber": 352,
//         "genres": [
//             "Научная фантастика",
//             "Утопия"
//         ],
//         "originalLanguage": "Английский"
//     }
// ]