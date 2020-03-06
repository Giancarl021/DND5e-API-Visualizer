const apiUrl = 'http://www.dnd5eapi.co';

const colors = [
    '#FF2B67',
    '#9C96EB',
    '#37FFD3',
    '#B2E827',
    '#FFD79C'
];

async function get(url) {
    return await (await fetch(url)).json();
}

async function init() {
    const index = Math.floor(Math.random() * colors.length);
    document.documentElement.style.setProperty('--color', colors[index]);
    const urls = await get(apiUrl + '/api');
    const size = ((obj) => {
        let i = 0;
        for (const key in obj) if (obj.hasOwnProperty(key)) i++;
        return i;
    })(urls);
    for (const key in urls) {
        if (urls.hasOwnProperty(key)) {
            parseItem(urls[key]).catch(console.log);
        }
    }
}

async function parseItem(url) {
    const item = document.createElement('div');
    item.className = 'item';
    console.log(url);
    const title = url.split('/').pop().split('-').map(word => {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
    }).join(' ');
    item.innerText = title;
    document.querySelector('section').appendChild(item);
}

document.addEventListener('DOMContentLoaded', init);
