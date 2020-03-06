const apiUrl = 'http://www.dnd5eapi.co/api/';

const colors = [
  '#FF2B67',
  '#9C96EB',
  '#37FFD3',
  '#B2E827',
  '#FFD79C'
];

async function getData() {
    const response = await fetch(apiUrl);
    const json = await response.json();
    return json;
}

getData().then(console.log);


function init() {
    const index = Math.floor(Math.random() * colors.length);
    document.documentElement.style.setProperty('--color', colors[index]);
}

document.addEventListener('DOMContentLoaded', init);
