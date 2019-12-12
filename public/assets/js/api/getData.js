import render from './render.js';
// import update from './update';


const live_url = "https://livescores.enaland.com/api/livescores";
const local_url = "http://192.168.43.93:8000/api/livescores";

const api_uri = local_url;
// const api_uri = `https://livescores.enaland.com/api/livescores`

function init() {
    fetch(api_uri)
        .then(res => {
            return res.json()
        })
        .then(data => {
            // renders all data initilly;
            render(data);

            // render news
            setTimeout(init, 5000);
        })
}

export default init;