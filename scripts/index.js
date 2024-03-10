let loading = false

if (localStorage.getItem('voted_user') != null) {
    showFinal(localStorage.getItem('voted_user'))
    
} else {
    fetch('https://production.threadscrush.online/api/vote/status')
    .then(response => response.json())
    .then(data => {
        if (data.voted_user) {
            showFinal(data.voted_user)
        }
    })
}

document.querySelector('.input-wrapper').addEventListener('submit', async (e) =>
{
    e.preventDefault()

    const token = grecaptcha.getResponse();
    const username = document.querySelector('#username').value
    toggleLoading()
    fetch('https://production.threadscrush.online/api/vote', {
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
        if (!response.ok)
        {
            return await showError(await response.json())
        }

        showFinal(username)
    }).catch(async _ => await showError({
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

document.querySelector('#github').addEventListener('click', () => window.location.href="https://github.com/iQuickDev/ThreadsCrush-Server")
document.querySelector('#viewLeaderboard').addEventListener('click', () => {window.location.href="leaderboard.html"})
document.querySelector('#changeVote').addEventListener('click', () => {
    fetch('https://production.threadscrush.online/api/vote', {
        method: 'DELETE'
    }).then(async response => {
        if (response.ok) {
            localStorage.removeItem('voted_user')
            window.location.href = '/'
        } else {
            await showError(response)
        }
    }).catch(_ => showError({
        error: "SERVER_UNREACHABLE",
        description: "The server could not be reached"
    }))
})

async function showError(obj)
{
    toggleLoading()
    document.querySelector('#error').style.opacity = 1
    document.querySelector('#errorTitle').textContent = obj.error
    document.querySelector('#errorText').textContent = obj.description
    await new Promise(r => setTimeout(r, 3000))
}

function hideError() {
    document.querySelector('#error').style.opacity = 0
}

function showFinal(username) {
    localStorage.setItem('voted_user', username)
    document.querySelector('#vote-form').style.display = "none"
    document.querySelector('.title').style.display = "none"
    document.querySelector('.voted').style.display = "block"
    document.querySelector('#votedUser').textContent = username
}

function toggleLoading() {
    loading = !loading
    let elem = document.querySelector('#confirm')
    if (loading) {
        const loader = document.createElement('span')
        loader.classList.add('loader')
        elem.innerHTML = ''
        elem.appendChild(loader)
    } else {
        elem.innerHTML = 'Confirm'
    }
}