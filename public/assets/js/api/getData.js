import render from './render.js';
// import update from './update';

const api_uri = `http://localhost:8000/api/livescores`

function init() {
    const res = fetch(api_uri)
        .then(res => {
            return res.json()
        })
        .then(data => {
            // renders all data initilly;
            render(data);

            // render news
            setTimeout(init, 4000);
        })
}

export default init;