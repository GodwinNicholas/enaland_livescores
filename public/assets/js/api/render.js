const matches1 = document.querySelector("#matches1");
const marquee = document.querySelector(".score");


// helper function
function abbreviate(league) {
    let result = "";
    league.split(" ").forEach(e => {
        result += e[0];
    })
    return result;
};


// render initial data
async function render(data) {
    let allMatchesHtml = ``;
    let allMatchesHtml1 = ``;
    // loop through data and add to html
    await data.livescores.forEach(l => {
        if (l.event_live === "1") {
            allMatchesHtml1 += `<div class="match" key="${l.event_key}">
            <div class="event-info">
                <span class="green league-name"> <p class="normal"> ${abbreviate(l.league_name)}</p> </span>
            </div>
            <div class="game-time">
            <p class="normal">${l.event_status.replace(/half time/gi, "HT").replace(/finished/gi, "FT").replace(/postponed/gi, "PP")}
            <span class="blinker2"> ${l.event_status.length > 5 ? "" : "'"} </span>
            </p> 
            </div>
            <div class="home ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].home_scorer.length > 0 ? "ss" : ""}">
            <p class="normal">${l.event_home_team} 
            ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].home_scorer.length > 0 ? '<i class=" yellow mx-1 fas fa-futbol"> ' + l.goalscorers[l.goalscorers.length - 1].home_scorer + '</i>' : ""}
            </p>
            </div>
            <div class="score-wrap2"><a href="/info/${l.event_key}">${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].away_scorer.length > 0 ? "ss" : ""}">
            <p class="normal">
            ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].away_scorer.length > 0 ? '<i class=" yellow mx-1 fas fa-futbol"> ' + l.goalscorers[l.goalscorers.length - 1].away_scorer + '</i>' : ""}
            ${l.event_away_team}</p>
            </div>
            <div></div>
        </div>
        `;
        }
        else {
            allMatchesHtml += `<div class="match" key="${l.event_key}">
            <div class="event-info">
                <span class="green league-name"> <p class="normal">${abbreviate(l.league_name)}</p> </span>
            </div>
            <div class="game-time">
            <p class="normal">${l.event_status ? l.event_status.replace(/half time/gi, "HT").replace(/finished/gi, "FT").replace(/postponed/gi, "PP") : l.event_time}</p>
            </div>
            <div class="home gf">
            <p class="normal">${ l.event_home_team}</p>
            </div>
            <div class="score-wrap2"><a href="/info/${l.event_key}">${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away gf">
            <p class="normal">${ l.event_away_team}</p>
            </div>
            <div></div>
        </div>
        `;
        }
    });

    matches1.innerHTML = allMatchesHtml1 + allMatchesHtml;

}

export default render;