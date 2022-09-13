import {getBooks, token} from "./books";


export const deleteBook = (book) => {
    fetch(`http://localhost:1717/books/delete/${book.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "X-Auth": `${token}`
        },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data,'djdjjd')
            getBooks()

        })
        .catch(error => {
            console.log(error)
        })
}

