import render from './render.js';
// import update from './update';


const live_url = "https://livescores.enaland.com/";
const local_url = "https://livescores.enaland.com/";

const api_uri = live_url;
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