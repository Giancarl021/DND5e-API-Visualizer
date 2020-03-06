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
    const size = (obj => {
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
    const title = url.split('/').pop().split('-').map(word => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    const links = ((await get(apiUrl + url)).results || []).map(item => `<span onclick="loadModal('${apiUrl + item.url}')">${item.name}</span>`).join('');
    item.innerHTML = `<h1 class="title">${title}</h1><div class="links">${links}</div>`;
    document.querySelector('section').appendChild(item);
}

async function loadModal(url) {
    const modal = document.getElementById('modal');
    const data = await get(url);
    console.log(data);
    modal.innerHTML = parseType(data);
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    function parseType(data) {
        const type = data.url.split('/').slice(-2, -1)[0];
        console.log(type);
        let r = '';
        switch(type) {
            case 'ability-scores':
                r = `<h1>${data.full_name}</h1>
                     <ul>${data.desc ? '<li>' + data.desc.join('</li><li>') + '</li>' : ''}</ul>
                     <ul>${data.skills ? '<li>' + data.skills.map(item => `<span style="cursor: pointer" onclick="loadModal(\'${apiUrl + item.url}\')">${item.name}</span>`).join('</li><li>') + '</li>' : ''}</ul>`;
                break;
            // case 'classes':
            //
            //     break;
            // case '':
            //
            //     break;
        }
        return r;
    }
}

document.addEventListener('DOMContentLoaded', init);
