

const marquee2 = document.querySelector("#news2");
const newsSlide = document.querySelector("#newsSlide");

let isShowingNews = 0;


// show full news
showFullNews();
async function showFullNews() {
    const api_uri2 = "http://localhost:8000/api/news/headline";
    fetch(api_uri2)
        .then(res => {
            return res.json()
        })
        .then(data => {
            let html = ``;
            data.forEach(i => {
                html += `<div class="carousel-item">
                            <img data-src="${i.imgURL}" src="${i.imgURL}" class="d-block w-100" alt="..loop">
                            <div>
                            <noscript>
                            <img src="${i.imgURL}">
                            </noscript>
                            </div>
                            <h5>${i.title}</h5>
                        </div>`;
            });
            newsSlide.innerHTML = `
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                ${html}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true" id="nbtn"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
            `;

            document.getElementsByClassName('carousel-item')[0].classList.add("active");
            setTimeout(() => document.querySelector("#nbtn").click(), 5000)

            $('.carousel').carousel({
                interval: 5000
            })
        })
}


function removeBra(text) {
    return text.replace(/[(][a-z0-9:,A-Z]+[)]/gi, "");
}

showNews();
function showNews() {
    const api_uri = "http://localhost:8000/api/news";


    fetch(api_uri)
        .then(res => {
            return res.json()
        })
        .then(data => {

            let html = ``;
            data.forEach((i, el, arr) => {
                html += `<span class="newstag"> ${removeBra(arr[el])} </span> || `
            });
            marquee2.innerHTML = html;
        })
}
