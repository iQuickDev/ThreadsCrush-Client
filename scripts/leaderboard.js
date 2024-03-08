document.addEventListener('DOMContentLoaded', async () =>
{
    let index = 1
    records.forEach(record =>
    {
        addToTable(index, record.username, record.votes);
        index++
    });
});

const pageElem = document.querySelector('#page')
let currentPage = 1
let last = 23

document.querySelector('#prev').addEventListener('click', async () =>
{
    if (currentPage > 1)
    {
        pageElem.value = `${--currentPage}/${last}`
    }
})

document.querySelector('#next').addEventListener('click', async () =>
{
    if (currentPage < last) {
        pageElem.value = `${++currentPage}/${last}`
    }

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

async function getPage(page)
{
    return await (await fetch(`http://localhost:3000/api/leaderboard?page=${page}`)).json()
}