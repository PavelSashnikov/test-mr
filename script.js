const controls = document.querySelector('#controls');
let searchRes = document.querySelector('#result');

const caseSens = controls.querySelector('#case');
let savedData = [];

window.onload = () => {
    fetchData().then(({ data }) => {
        savedData = data;
    });
}

controls.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('#length')) {
        getLength();
        return;
    } else if (target.closest('#substr')) {
        getString();
        return;
    }
})

function fetchData() {
    const url = 'http://localhost:3000/data.json';
    return fetch(url)
        .then(resp => resp.json())
}

function clearRes() {
    searchRes.innerText = '';
}

function getLength() {
    const usersVal = controls.querySelector('#usersVal').value;
    if (usersVal.match(/[0-9]/) === null) {
        alert('Для поиска по длине используйте цифры');
        return;
    }
    clearRes();
    savedData.forEach(el => {
        if (el.length > parseInt(usersVal)) {
            searchRes.innerHTML += `${el} `;
        }
    })
}

function getString() {
    const usersVal = controls.querySelector('#usersVal').value;
    clearRes();
    if (caseSens.checked) {
        savedData.forEach(el => {
            if (el.indexOf(usersVal) !== -1) {
                searchRes.innerText += `${el} `;
            }
        })
    } else if (!caseSens.checked) {
        savedData.forEach(el => {
            if (el.toLowerCase().indexOf(usersVal.toLowerCase()) !== -1) {
                searchRes.innerText += `${el} `;
            }
        })
    }
}
