document.querySelector('.input-wrapper').addEventListener('submit', async (e) => {
    e.preventDefault()

    const token = grecaptcha.getResponse();
    const username = document.querySelector('#username').value

    fetch('http://localhost:3000/api/vote', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.substring(1),
            recaptcha_token: token
        })
    }).then(async response => {
        if (!response.ok) {
            showError(await response.text())
        }
    }).catch(error => showError(error.message))
})

document.querySelector('#username').addEventListener('keydown', (e) => {
    if (e.key == ' ') {
        e.preventDefault()
        return
    }

    if (e.key != '@' && e.key != 'Backspace' && e.key.length == 1 && document.querySelector('#username').value.length == 0) {
        document.querySelector('#username').value += '@'
    }
})

document.querySelector('#username').addEventListener('keyup', () => {
    document.querySelector('#confirm').disabled = document.querySelector('#username').value.length < 2
})

function showError(message) {
    document.querySelector('#error').style.opacity = 1
    document.querySelector('#errorText').textContent = "ERROR: " + message
    document.querySelector('.error-wrapper').style.animation = "showError .3s linear forwards"
}