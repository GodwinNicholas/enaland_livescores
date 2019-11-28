import render from './render.js';
// import update from './update';

// const api_uri = `http://localhost:8000/api/livescores`
const api_uri = `http://192.168.43.93:8000/api/livescores`

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