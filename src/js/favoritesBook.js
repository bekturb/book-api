import {getBooks, token} from "./books";
import {getBookInfo} from "./bookDetail";


export function setFavoriteBook (like, book) {
    console.log(book.isFavorite)
    fetch(`http://localhost:1717/books/update/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "X-Auth": `${token}`
        },
        body: JSON.stringify({ isFavorite: !book.isFavorite}),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data,'djdjjd')
            changeBookFavorites(like, data)
            getBooks()
        })
        .catch(error => {
            console.log(error)
        })
}

function changeBookFavorites (like, data){
    console.log(like)
    if (data.isFavorite === true){
        like.style.color = 'red'
    }else{
        like.style.color = 'white'
    }
}