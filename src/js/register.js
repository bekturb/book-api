


const registerForm = document.querySelector('#register--form')
const registerLogin = document.querySelector('#login')
const registerPassword = document.querySelector('#password')
const repeatPassword = document.querySelector('#repeat-password')
const registerUsername = document.querySelector('#username')
const warning = document.querySelector('.registerForm__warning')
const registerAge = document.querySelector('#age')
const character = /^[a-zA-Z0-9_-]{3,21}$/;

let person = {}

registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    checkFields()
    if (person.username && person.password && person.repeatPassword && person.firstName && person.age) {
        registerValidate(person)
    }
})


function checkFields() {
    const loginValue = registerLogin.value.trim()
    const passwordValue = registerPassword.value.trim()
    const repeatPassValue = repeatPassword.value.trim()
    const userNameValue = registerUsername.value.trim()
    const ageValue = registerAge.value.trim()

    if (character.test(loginValue) !== true) {
        setError(registerLogin, 'error--send')
    } else {
        setSuccess(registerLogin, 'error--send')
    }

    if (character.test(userNameValue) !== true) {
        setError(registerUsername, 'error--send')
    } else {
        setSuccess(registerUsername, 'error--send')
    }

    if (ageValue === '') {
        setError(registerAge, 'error--send')
    } else {
        setSuccess(registerAge, 'error--send')
    }

    if (character.test(passwordValue) !== true) {
        setError(registerPassword, 'error--send')
    } else {
        setSuccess(registerPassword, 'error--send')
    }
    if (character.test(repeatPassValue) !== true) {
        setError(repeatPassword, '')
    } else if (passwordValue !== repeatPassValue) {
        setError(repeatPassword, 'error-repeated')
    } else {
        setSuccess(repeatPassword, 'error-repeated')
    }


}

function setError(login, message) {
    const errorSpan = login.parentElement.querySelector('.registerForm__error-message')
    errorSpan.classList.add(message)
    login.classList.add('input-error')
}

function setSuccess(login, message) {
    const errorSpan = login.parentElement.querySelector('.registerForm__error-message')
    errorSpan.classList.remove(message)
    login.classList.remove('input-error')
    person = {...person, [login.name]: login.value}
}

const registerValidate = async () => {

    try {
        const responseData = await fetch("http://localhost:1717/signin", {
            method: "POST",

            body: JSON.stringify(person),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (responseData.ok === false) {
            console.log(404)
        } else {
            setTimeout(() => {
                location.assign("/books.html")
            }, 500)
        }

        const newUser = await responseData.json()
        if (newUser === 'user with this username already exists'){
            warning.classList.add('warning')
        }else{
            warning.classList.remove('warning')
            const personalUser = newUser.data
            const personalToken = newUser.token

            localStorage.setItem("user", personalUser.username)
            localStorage.setItem("token", personalToken)
        }

    } catch (error) {
        console.log("Couldn't fetch", error.message)
    }
}