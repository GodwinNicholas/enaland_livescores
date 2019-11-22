const matches1 = document.querySelector("#matches1");
const matches2 = document.querySelector("#matches2");
const sidebar = document.querySelector(".sidebar");
const marquee = document.querySelector(".score");

// render initial data
async function render(data) {
    let allMatchesHtml = ``;
    let upMatchesHtml = ``;
    let allMarquees = ``;
    let allCountriesHtml = `
        <ul>
        <hr>
            <li><span class="circle-dot active"><i class="fas fa-dot-circle"></i></span> <a href="#"
                class="active">Home</a>
            </li>
            <hr>
                <li><span class="circle-dot"><i class="fas fa-dot-circle"></i></span> <a href="#" class="active">Live</a>
                </li>
                <hr>
                    `;

    // loop through data and add to html
    await data.livescores.forEach(l => {
        if (l.event_live == 1) {
            allMatchesHtml += `<div class="match" key="${l.event_key}">
            <div class="event-info">
                <span class="green league-name"> ${l.league_name} </span>
            </div>
            <div class="">${l.event_status}
                <span class="blinker2"> ${l.event_status.length > 5 ? "" : '"'} </span>
            </div>
            <div class="home yellow">${ l.event_home_team}</div>
            <div class="score-wrap2"><a href="/info/"${ l.event_key}>${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away yellow">${ l.event_away_team}</div>
            <div></div>
        </div>
        `;
        }
        else if (l.event_live == 0 && !l.event_status && new Date < new Date(`${l.event_date} ${l.event_time}`)) {
            upMatchesHtml += `<div class="match" key="${l.event_key}">
            <div class="event-info">
                <span class="green league-name"> ${l.league_name} </span>
            </div>
            <div class="">${l.event_status ? l.event_status : ""}
                <span> ${l.event_time}</span>
            </div>
            <div class="home yellow">${ l.event_home_team}</div>
            <div class="score-wrap2"><a href="/info/"${ l.event_key}>${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away yellow">${ l.event_away_team}</div>
            <div></div>
        </div>
        `;
        }
    });

    await data.livescores.forEach(l => {
        if (l.event_live == 1) {
            allMarquees += `
            <div>${l.event_home_team}</span><span class="score-wrap"><span>${l.event_final_result[0]}</span>:<span>${l.event_final_result[l.event_final_result.length - 1]}</span></span><span>${l.event_away_team}</div>
            `;
        }
        else {
            allMarquees += `
            <div>${l.event_home_team}</span><span class="score-wrap"><span>-</span>:<span>-</span></span><span>${l.event_away_team}</div>
            `;
        }
    });

    await data.livescores.forEach(c => {
        allCountriesHtml += `<li><span class="circle-dot"><i class="fas fa-dot-circle"></i></span> <a href="#"
                >${ c.country_name}</a>
            </li>
            <hr>`;
    })

    matches1.innerHTML = allMatchesHtml;
    matches2.innerHTML = upMatchesHtml;
    sidebar.innerHTML = (allCountriesHtml + "</ul>");
    marquee.innerHTML = allMarquees;

}

export default render;