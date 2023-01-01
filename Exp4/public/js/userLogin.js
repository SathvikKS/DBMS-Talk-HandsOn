const loginForm = document.querySelector('#loginForm')
const email = document.querySelector('#uemail')
const password = document.querySelector('#psw')
const loginError = document.querySelector('#loginError')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginError.textContent = ""
    const body = {
        "email": email.value,
        "password": password.value
    }
    fetch('/api/userLogin', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.status != 200) {
            response.json().then(data => loginError.textContent = data.message).catch((e) => {})
        } else {
            window.location.replace("/welcome");
        }
    }).catch((err) => {
        console.log('error')
        console.log(err)
    })
})