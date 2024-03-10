const pageElem = document.querySelector('#page')
let username = ''
let pagination = {
    current: 1,
    last: 0,
}

window.addEventListener('load', async () =>
{
    buildTable(await getPage(1))
})

document.querySelector('#prev').addEventListener('click', async () =>
{
    if (pagination.current > 1)
    {
        pageElem.value = `${--pagination.current}/${pagination.last}`
        buildTable(await getPage(pagination.current))
    }
})

document.querySelector('#next').addEventListener('click', async () =>
{
    if (pagination.current < pagination.last) {
        pageElem.value = `${++pagination.current}/${pagination.last}`
        buildTable(await getPage(pagination.current))
    }
})

document.querySelector('#search-input').addEventListener('input', (e) => {
    username = e.target.value
})

document.querySelector('#search').addEventListener('click', async () => {
    buildTable(await getPage(1, username))
})

function addToTable(rank, username, votes)
{
    const tableBody = document.querySelector('tbody');
    const row = document.createElement('tr');
    const rankTd = document.createElement('td');
    const usernameTd = document.createElement('td');
    const votesTd = document.createElement('td');
    rankTd.textContent = rank
    usernameTd.textContent = username
    votesTd.textContent = votes
    row.appendChild(rankTd)
    row.appendChild(usernameTd)
    row.appendChild(votesTd)
    tableBody.appendChild(row)
}

async function getPage(page, username = null)
{
    return await (await fetch(`https://production.threadscrush.online/api/leaderboard?page=${page}${username != null ? '&username=' + username : ''}`)).json()
}

function buildTable(leaderboardResponse) {
    document.querySelector('tbody').innerHTML = ''
    leaderboardResponse.users.forEach((user) => {
        addToTable(user.rank, user.username, user.votes)
    })

    pagination = leaderboardResponse.pagination
    pageElem.value = `${pagination.current}/${pagination.last}`
}