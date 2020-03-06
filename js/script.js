const apiUrl = 'http://www.dnd5eapi.co/api/';

async function getData() {
    const response = await fetch(apiUrl);
    const json = await response.json();
    return json;
}

getData().then(console.log);
