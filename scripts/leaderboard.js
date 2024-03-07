document.addEventListener('DOMContentLoaded', async () => {
    const records = generateRandomRecords(10)
    
    let index = 1
    records.forEach(record => {
        addToTable(index, record.username, record.votes);
        index++
    });
});

const pageElem = document.querySelector('#page')
let currentPage = 1

document.querySelector('#prev').addEventListener('click', async () => {
    if (currentPage > 1) {
        pageElem.value = `${--currentPage}/${last}`
    }
})

document.querySelector('#next').addEventListener('click', async () => {
    pageElem.value = `${++currentPage}/${last}`
})

function addToTable(id, username, votes) {
    const table = document.querySelector('.votes-table');
    const row = document.createElement('tr');
    const idTd = document.createElement('td');
    const usernameTd = document.createElement('td');
    const votesTd = document.createElement('td');
    idTd.textContent = id
    usernameTd.textContent = username
    votesTd.textContent = votes
    row.appendChild(idTd)
    row.appendChild(usernameTd)
    row.appendChild(votesTd)
    table.appendChild(row)
}

async function getPage(page) {
    return await (await fetch(`http://localhost:3000/api/leaderboard?page=${page}`)).json()
}