const loginForm = document.querySelector('#signupForm')
const email = document.querySelector('#uemail')
const uname = document.querySelector('#uname')
const password = document.querySelector('#psw')
const repassword = document.querySelector('#rpsw')
const signupError = document.querySelector('#signupError')

loginForm.addEventListener('submit', (e) => {
    signupError.textContent=""
    e.preventDefault()
    if (password.value !== repassword.value) {
        return signupError.textContent = "The entered passwords do not match"
    }
    const body = {
        "name": uname.value,
        "email": email.value,
        "password": password.value
    }
    fetch('/api/userSignup', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.status != 200) {
            response.json().then(data => signupError.textContent = data.message).catch((e) => {})
        } else {
            window.location.replace("/login");
        }
    }).catch((err) => {
        console.log('error')
        console.log(err)
    })
})