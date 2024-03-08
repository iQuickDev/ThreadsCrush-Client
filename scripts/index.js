let loading = false

window.addEventListener('load', () => {
    fetch('http://localhost:3000/api/vote/status')
    .then(response => response.json())
    .then(data => {
        if (data.voted_user) {
            showFinal(data.voted_user)
        }
    })
})

document.querySelector('.input-wrapper').addEventListener('submit', async (e) =>
{
    e.preventDefault()

    const token = grecaptcha.getResponse();
    const username = document.querySelector('#username').value
    toggleLoading()
    fetch('http://localhost:3000/api/vote', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.substring(1),
            recaptcha_token: token
        })
    }).then(async response =>
    {
        toggleLoading()
        if (!response.ok)
        {
            return showError(await response.json())
        }

        showFinal(username)
    }).catch(_ => showError({
        error: "SERVER_UNREACHABLE",
        description: "The server could not be reached"
    }))
})

document.querySelector('#username').addEventListener('keydown', (e) =>
{
    if (e.key == ' ')
    {
        e.preventDefault()
        return
    }

    if (e.key != '@' && e.key != 'Backspace' && e.key.length == 1 && document.querySelector('#username').value.length == 0)
    {
        document.querySelector('#username').value += '@'
    }
})

document.querySelector('#username').addEventListener('keyup', () =>
{
    document.querySelector('#confirm').disabled = document.querySelector('#username').value.length < 2
})

document.querySelector('#viewLeaderboard').addEventListener('click', () => {window.location.href="leaderboard.html"})
document.querySelector('#changeVote').addEventListener('click', () => {
    fetch('http://localhost:3000/api/vote', {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            window.location.href = '/'
        } else {
            showError(response)
        }
    }).catch(_ => showError({
        error: "SERVER_UNREACHABLE",
        description: "The server could not be reached"
    }))
})

function showError(obj)
{
    toggleLoading()
    document.querySelector('#error').style.opacity = 1
    document.querySelector('#errorText').textContent = `${obj.error}: ${obj.description}`
    document.querySelector('.error-wrapper').style.animation = "showError .3s linear forwards"
}

function hideError() {
    document.querySelector('#error').style.opacity = 0
}

function showFinal(username) {
    document.querySelector('#vote-form').style.display = "none"
    document.querySelector('.title').style.display = "none"
    document.querySelector('.voted').style.display = "block"
    document.querySelector('#votedUser').textContent = username
}

function toggleLoading() {
    let elem = document.querySelector('#confirm')
    loading = !loading
    if (loading) {
        const loader = document.createElement('span')
        loader.classList.add('loader')
        elem.innerHTML = ''
        elem.appendChild(loader)
    } else {
        elem.innerHTML = 'Confirm'
    }
}