/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/bookDetail.js":
/*!******************************!*\
  !*** ./src/js/bookDetail.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookDetail": () => (/* binding */ bookDetail),
/* harmony export */   "getBookInfo": () => (/* binding */ getBookInfo),
/* harmony export */   "showBookDetail": () => (/* binding */ showBookDetail)
/* harmony export */ });
/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./books */ "./src/js/books.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./update */ "./src/js/update.js");


const bookDetail = document.querySelector('.books--detail');
const card = document.querySelector('.detail--card');
const button = document.querySelector('.books--detail__button');
const close = document.querySelector('.fa-xmark');
function showBookDetail(id) {
  bookDetail.classList.add('visible');
  getBookInfo(id);
}
function getBookInfo(id) {
  fetch(`http://localhost:1717/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "X-Auth": `${_books__WEBPACK_IMPORTED_MODULE_0__.token}`
    }
  }).then(res => res.json()).then(data => {
    console.log(data);
    setBookItems(data);
  }).catch(error => {
    console.log(error);
  });
}

function setBookItems(data) {
  card.innerHTML = '';
  const cardTitle = document.createElement('h1');
  cardTitle.setAttribute('class', 'detail--card__title');
  cardTitle.append(`${data.name}`);
  const cardAuthor = document.createElement('p');
  cardAuthor.setAttribute('class', 'detail--card__author');
  cardAuthor.append(`${data.author}`);
  const booksInner = document.createElement('div');
  booksInner.setAttribute('class', 'books--inner');
  const publishHouse = document.createElement('p');
  publishHouse.setAttribute('class', 'books--inner__publishHouse');
  publishHouse.append(`Издательство:  ${data.publishHouse}`);
  const publishYear = document.createElement('p');
  publishYear.setAttribute('class', 'books--inner__publishYear');
  publishYear.append(`Год издания:  ${data.publishYear}`);
  const genres = document.createElement('p');
  genres.setAttribute('class', 'books--inner__genres');
  genres.append(`Жанры:  ${data.genres}`);
  const originalLanguage = document.createElement('p');
  originalLanguage.setAttribute('class', 'books--inner__originalLanguage');
  originalLanguage.append(`Язык оригинала:  ${data.originalLanguage}`);
  const pagesNumber = document.createElement('p');
  pagesNumber.setAttribute('class', 'books--inner__pagesNumber');
  pagesNumber.append(`Количество страниц:  ${data.pagesNumber}`);
  booksInner.append(publishHouse, originalLanguage, publishYear, pagesNumber, genres);
  card.append(cardTitle, cardAuthor, booksInner);
  button.addEventListener('click', () => {
    bookDetail.classList.remove('visible');
    (0,_update__WEBPACK_IMPORTED_MODULE_1__.changeBook)(data);
  });
}

close.addEventListener('click', () => {
  bookDetail.classList.remove('visible');
  _books__WEBPACK_IMPORTED_MODULE_0__.books.classList.remove('books--visible');
});

/***/ }),

/***/ "./src/js/books.js":
/*!*************************!*\
  !*** ./src/js/books.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "books": () => (/* binding */ books),
/* harmony export */   "getBooks": () => (/* binding */ getBooks),
/* harmony export */   "token": () => (/* binding */ token)
/* harmony export */ });
/* harmony import */ var _bookDetail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookDetail */ "./src/js/bookDetail.js");
/* harmony import */ var _favoritesBook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./favoritesBook */ "./src/js/favoritesBook.js");
/* harmony import */ var _deleteBook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deleteBook */ "./src/js/deleteBook.js");
/* harmony import */ var _createBook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createBook */ "./src/js/createBook.js");




const wrapper = document.querySelector('#wrapper');
const books = document.querySelector('.books');
const userName = document.querySelector('.books__user');
const booksCorner = document.querySelector('.books__corner');
const booksItem = document.querySelector('.books__items');
const emptyMessage = document.querySelector('.empty-message');
const warningMessage = document.querySelector('.warning-message__title');
const addButton = document.querySelector('.books__button--add');
const logout = document.querySelector('.books__button--logout');
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
userName.append(user);
logout.addEventListener("click", () => {
  localStorage.setItem('token', null);
  setTimeout(() => {
    location.assign('/index.html');
  }, 200);
});
const getBooks = () => {
  wrapper.innerHTML = '';
  fetch("http://localhost:1717/books", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "X-Auth": `${token}`
    }
  }).then(res => res.json()).then(data => {
    console.log(data);

    if (data === 'Access is denied') {
      bookVisible();
    } else if (data.length === 0) {
      noneBook();
    } else {
      data.forEach(book => {
        const booksCard = document.createElement("div");
        booksCard.setAttribute('class', "books__card");
        wrapper.append(booksCard);
        const booksInfo = document.createElement("div");
        booksInfo.setAttribute('class', "books__info");
        booksCard.append(booksInfo);
        booksInfo.addEventListener('click', () => {
          books.classList.add('books--visible');
          (0,_bookDetail__WEBPACK_IMPORTED_MODULE_0__.showBookDetail)(book.id);
        });
        const booksName = document.createElement("h2");
        booksName.setAttribute('class', "books__book-name");
        booksName.append(`${book.name}`);
        booksInfo.append(booksName);
        const booksAuthor = document.createElement("p");
        booksAuthor.setAttribute('class', "books__book-author");
        booksAuthor.append(`${book.author}`);
        booksInfo.append(booksAuthor);
        const booksFunc = document.createElement("div");
        booksFunc.setAttribute('class', "books__func");
        booksCard.append(booksFunc);
        const likeIcon = document.createElement("i");
        likeIcon.setAttribute('class', "fa-solid fa-heart");
        booksFunc.append(likeIcon);
        likeIcon.addEventListener('click', () => {
          (0,_favoritesBook__WEBPACK_IMPORTED_MODULE_1__.setFavoriteBook)(likeIcon, book);
        });

        if (book.isFavorite === true) {
          likeIcon.style.color = 'red';
        } else {
          likeIcon.style.color = 'white';
        }

        const trashIcon = document.createElement("i");
        trashIcon.setAttribute('class', "fa-solid fa-trash");
        booksFunc.append(trashIcon);
        trashIcon.addEventListener("click", () => {
          (0,_deleteBook__WEBPACK_IMPORTED_MODULE_2__.deleteBook)(book);
        });
      });
    }
  }).catch(error => {
    console.log(error);
  });
};
getBooks();

function bookVisible() {
  booksCorner.classList.add('books__visible');
  booksItem.classList.add('books__visible');
  warningMessage.style.display = 'block';
}

function noneBook() {
  booksCorner.classList.add('books__visible');
  booksItem.classList.add('books__visible');
  emptyMessage.style.display = 'block';
}

addButton.addEventListener('click', () => {
  books.classList.add('books--visible');
  (0,_createBook__WEBPACK_IMPORTED_MODULE_3__.addBook)();
}); // "books": [
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

/***/ }),

/***/ "./src/js/createBook.js":
/*!******************************!*\
  !*** ./src/js/createBook.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBook": () => (/* binding */ addBook)
/* harmony export */ });
/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./books */ "./src/js/books.js");


const createForm = document.querySelector('.create--form');
const bookName = document.querySelector('#name');
const bookAuthor = document.querySelector('#author');
const radioButtons = document.querySelectorAll('.isFavoriteInput');
const createNewBook = document.querySelector('.create--book');
const xmark = document.querySelector('.close-mark');
const addBook = () => {
  createNewBook.classList.add('create-visible');
};
let newBook = {};
const newBookFields = ["publish--year", "publish--house", "original-language", "genres", "page"];
createForm.addEventListener("submit", e => {
  e.preventDefault();
  checkCreateFields();

  if (newBook.name && newBook.author) {
    newBookFields.forEach(el => {
      const field = document.querySelector(`#${el}`);

      if (field.name === 'publishYear') {
        newBook.publishYear = Number(field.value);
      } else if (field.name === 'genres') {
        newBook.genres = [field.value];
      } else if (field.name === 'pagesNumber') {
        newBook.pagesNumber = Number(field.value);
      } else {
        setSuccessBook(field);
      }
    });
    radioButtons.forEach(button => {
      if (button.checked === true) {
        newBook.isFavorite = Boolean(Number(button.value));
      }
    });
    newBookApi(newBook);
  }
});

function checkCreateFields() {
  const bookNameValue = bookName.value.trim();
  const bookAuthorValue = bookAuthor.value.trim();

  if (bookNameValue === '') {
    setBookError(bookName, 'error-message');
  } else {
    setBookSuccess(bookName, 'error-message');
    setSuccessBook(bookName);
  }

  if (bookAuthorValue === '') {
    setBookError(bookAuthor, 'error-message');
  } else {
    setBookSuccess(bookAuthor, 'error-message');
    setSuccessBook(bookAuthor);
  }
}

function setBookError(book, message) {
  const errorSpan = book.parentElement.querySelector('.create--form__error-message');
  errorSpan.classList.add(message);
  book.classList.add('input-error');
}

function setBookSuccess(book, message) {
  const errorSpan = book.parentElement.querySelector('.create--form__error-message');
  errorSpan.classList.remove(message);
  book.classList.remove('input-error');
}

function setSuccessBook(book) {
  newBook = { ...newBook,
    [book.name]: book.value
  };
  console.log(newBook);
}

const newBookApi = async newBook => {
  try {
    const response = await fetch("http://localhost:1717/books/create", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Auth": `${_books__WEBPACK_IMPORTED_MODULE_0__.token}`
      }
    });

    if (response.ok === false) {
      console.log(404);
    } else {
      setTimeout(() => {
        location.assign("/books.html");
      }, 500);
    }

    const data = await response.json();
    console.log(data);
    (0,_books__WEBPACK_IMPORTED_MODULE_0__.getBooks)();
  } catch (error) {
    console.log("Couldn't fetch", error.message);
  }
};

xmark.addEventListener("click", () => {
  createNewBook.classList.remove('create-visible');
  _books__WEBPACK_IMPORTED_MODULE_0__.books.classList.remove('books--visible');
});

/***/ }),

/***/ "./src/js/deleteBook.js":
/*!******************************!*\
  !*** ./src/js/deleteBook.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteBook": () => (/* binding */ deleteBook)
/* harmony export */ });
/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./books */ "./src/js/books.js");

const deleteBook = book => {
  fetch(`http://localhost:1717/books/delete/${book.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "X-Auth": `${_books__WEBPACK_IMPORTED_MODULE_0__.token}`
    }
  }).then(res => res.json()).then(data => {
    console.log(data, 'djdjjd');
    (0,_books__WEBPACK_IMPORTED_MODULE_0__.getBooks)();
  }).catch(error => {
    console.log(error);
  });
};

/***/ }),

/***/ "./src/js/favoritesBook.js":
/*!*********************************!*\
  !*** ./src/js/favoritesBook.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFavoriteBook": () => (/* binding */ setFavoriteBook)
/* harmony export */ });
/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./books */ "./src/js/books.js");
/* harmony import */ var _bookDetail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookDetail */ "./src/js/bookDetail.js");


function setFavoriteBook(like, book) {
  console.log(book.isFavorite);
  fetch(`http://localhost:1717/books/update/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "X-Auth": `${_books__WEBPACK_IMPORTED_MODULE_0__.token}`
    },
    body: JSON.stringify({
      isFavorite: !book.isFavorite
    })
  }).then(res => res.json()).then(data => {
    console.log(data, 'djdjjd');
    changeBookFavorites(like, data);
    (0,_books__WEBPACK_IMPORTED_MODULE_0__.getBooks)();
  }).catch(error => {
    console.log(error);
  });
}

function changeBookFavorites(like, data) {
  console.log(like);

  if (data.isFavorite === true) {
    like.style.color = 'red';
  } else {
    like.style.color = 'white';
  }
}

/***/ }),

/***/ "./src/js/update.js":
/*!**************************!*\
  !*** ./src/js/update.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeBook": () => (/* binding */ changeBook)
/* harmony export */ });
/* harmony import */ var _bookDetail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookDetail */ "./src/js/bookDetail.js");
/* harmony import */ var _books__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./books */ "./src/js/books.js");


const updateBook = document.querySelector(".update--book");
const updateForm = document.querySelector('.update--form');
const updateBookName = document.querySelector('#bookName');
const updateBookAuthor = document.querySelector('#bookAuthor');
const inputs = document.querySelectorAll('.field');
const updateClose = document.querySelector('.update-close');
let dataId = '';
function changeBook(data) {
  updateBook.classList.add('update-visible');
  inputs.forEach(field => {
    if (field.type === 'radio') {
      console.log(Boolean(Number(field.value)));
      Boolean(Number(field.value)) === data.isFavorite ? field.checked = true : field.checked = false;
    }

    field.value = data[field.name];
  });
  dataId = data.id;
}
let updatedBook = {};
updateForm.addEventListener("submit", e => {
  e.preventDefault();
  checkUpdatedFields();

  if (updatedBook.name && updatedBook.author) {
    inputs.forEach(field => {
      if (field.name === 'publishYear') {
        updatedBook.publishYear = Number(field.value);
      } else if (field.name === 'genres') {
        updatedBook.genres = [field.value];
      } else if (field.name === 'pagesNumber') {
        updatedBook.pagesNumber = Number(field.value);
      } else if (field.type === 'radio') {
        console.log(field, 'dggdgggd');

        if (field.checked === true) {
          console.log(field);
        } else {
          setSuccessBook(field);
        }
      }
    });
    updateBookApi(updatedBook, dataId);
  }

  _bookDetail__WEBPACK_IMPORTED_MODULE_0__.bookDetail.classList.add('visible');
  updateBook.classList.remove('update-visible');
});

function checkUpdatedFields() {
  const updateBookNameValue = updateBookName.value.trim();
  const updateBookAuthorValue = updateBookAuthor.value.trim();

  if (updateBookNameValue === '') {
    setBookError(updateBookName, 'error-message');
  } else {
    setBookSuccess(updateBookName, 'error-message');
    setSuccessBook(updateBookName);
  }

  if (updateBookAuthorValue === '') {
    setBookError(updateBookAuthor, 'error-message');
  } else {
    setBookSuccess(updateBookAuthor, 'error-message');
    setSuccessBook(updateBookAuthor);
  }
}

const setBookError = (book, message) => {
  const errorSpan = book.parentElement.querySelector('.update--form__error-message');
  errorSpan.classList.add(message);
  book.classList.add('input-error');
};

const setBookSuccess = (book, message) => {
  const errorSpan = book.parentElement.querySelector('.update--form__error-message');
  errorSpan.classList.remove(message);
  book.classList.remove('input-error');
};

function setSuccessBook(book) {
  updatedBook = { ...updatedBook,
    [book.name]: book.value,
    isFavorite: book.checked.value
  };
  console.log(updatedBook);
}

async function updateBookApi(newBook, id) {
  try {
    const response = await fetch(`http://localhost:1717/books/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Auth": `${_books__WEBPACK_IMPORTED_MODULE_1__.token}`
      },
      body: JSON.stringify(newBook)
    });
    const data = await response.json();
    console.log(data);
    (0,_books__WEBPACK_IMPORTED_MODULE_1__.getBooks)();
    (0,_bookDetail__WEBPACK_IMPORTED_MODULE_0__.getBookInfo)(data.id);
  } catch (error) {
    console.log("Couldn't fetch", error.message);
  }
}

updateClose.addEventListener('click', () => {
  _bookDetail__WEBPACK_IMPORTED_MODULE_0__.bookDetail.classList.add('visible');
  updateBook.classList.remove('update-visible');
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/books.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=books.493771763305ab1194bb.js.map