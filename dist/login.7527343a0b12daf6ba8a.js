/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
const loginForm = document.querySelector('.loginForm');
const warning = document.querySelector('.loginForm__warning');
let users = {};
let loginValid = false;

if (loginForm) {
  const fields = ['username', 'password'];
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    fields.forEach(field => {
      const inputs = document.querySelector(`#${field}`);
      checkInputs(inputs);
    });
  });

  function checkInputs(field) {
    if (field.value.trim() === '') {
      setStatus(field, "error-message", "error");
      return false;
    } else {
      setStatus(field, "error-message", "success");
      loginValid = true;
    }
  }
}

function setStatus(field, message, status) {
  const errorMessage = field.parentElement.querySelector(".loginForm__error-message");

  if (status === "error") {
    errorMessage.classList.add(message);
    field.classList.add("input-error");
  }

  if (status === "success") {
    errorMessage.classList.remove(message);
    field.classList.remove("input-error");
    users = { ...users,
      [field.name]: field.value
    };
  }

  if (loginValid === true) {
    setValidate(users);
  }
}

const setValidate = async users => {
  try {
    const response = await fetch("http://localhost:1717/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(users)
    });

    if (response.ok === false) {
      warning.classList.add('warning');
    } else {
      setTimeout(() => {
        location.assign('/books.html');
      }, 200);
    }

    const userResult = await response.json();
    const personalUser = userResult.data;
    const personalToken = userResult.token;
    localStorage.setItem("user", personalUser.username);
    localStorage.setItem("token", personalToken);
  } catch (error) {
    console.log("Couldn't Fetch", error.message);
  }
};
/******/ })()
;
//# sourceMappingURL=login.7527343a0b12daf6ba8a.js.map