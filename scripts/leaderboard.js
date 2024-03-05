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

document.querySelector('#prev').addEventListener('click', () => {
    if (currentPage > 1) {
        pageElem.value = --currentPage
    }
})

document.querySelector('#next').addEventListener('click', () => {
    pageElem.value = ++currentPage
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

function generateRandomRecords(count) {
    const records = [];
    for (let i = 0; i < count; i++) {
        const username = generateRandomUsername();
        const votes = generateRandomVotes();
        records.push({count, username, votes });
    }
    return records;
}

function generateRandomUsername() {
    const adjectives = ['Happy', 'Funny', 'Clever', 'Smart', 'Creative'];
    const nouns = ['Cat', 'Dog', 'Bird', 'Fish', 'Elephant'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective} ${noun}`
}

function generateRandomVotes() {
    return Math.floor(Math.random() * 100);
}