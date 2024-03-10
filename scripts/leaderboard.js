const pageElem = document.querySelector('#page')
let username = ''
let pagination = {
    current: 1,
    last: 0,
}
let tableLoading = false

document.querySelector('#home').addEventListener('click', () => window.location.href = "/")

window.addEventListener('load', async () =>
{
    buildTable(await getPage(1))
})

document.querySelector('#prev').addEventListener('click', async () =>
{
    if (tableLoading) {
        return
    }
    if (pagination.current > 1)
    {
        pageElem.value = `${--pagination.current}/${pagination.last}`
        buildTable(await getPage(pagination.current))
    }
})

document.querySelector('#next').addEventListener('click', async () =>
{
    if (tableLoading) {
        return
    }
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
    toggleTableLoading()
    return await (await fetch(`https://production.threadscrush.online/api/leaderboard?page=${page}${username != null ? '&username=' + username : ''}`)).json()
}

function buildTable(leaderboardResponse) {
    toggleTableLoading()
    document.querySelector('tbody').innerHTML = ''
    leaderboardResponse.users.forEach((user) => {
        addToTable(user.rank, user.username, user.votes)
    })

    for (let i = 0; i < 15 - leaderboardResponse.users.length; i++) {
        addToTable('\xA0\xA0\xA0','\xA0\xA0\xA0','\xA0\xA0\xA0')
    }

    pagination = leaderboardResponse.pagination
    pageElem.value = `${pagination.current}/${pagination.last}`
}

function toggleTableLoading() {
    tableLoading = !tableLoading
    let elem = document.querySelector('tbody')
    if (tableLoading) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('table-loader')
        const loader = document.createElement('span')
        loader.classList.add('loader')
        wrapper.appendChild(loader)
        elem.innerHTML = ''
        elem.appendChild(wrapper)
    } else {
        elem.innerHTML = ''
    }
}