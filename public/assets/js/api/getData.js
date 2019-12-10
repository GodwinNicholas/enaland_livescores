import render from './render.js';
// import update from './update';


const url = window.location.href == "https://livescores.enaland.com/" ? "https://livescores.enaland.com/" : `http://192.168.43.93:8000/api/livescores`;

const api_uri = url;
// const api_uri = `https://livescores.enaland.com/api/livescores`

function init() {
    const res = fetch(api_uri)
        .then(res => {
            return res.json()
        })
        .then(data => {
            // renders all data initilly;
            render(data);

            // render news
            setTimeout(init, 10000);
        })
}

export default init;