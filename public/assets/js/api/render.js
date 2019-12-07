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
                <span class="green league-name"> <i class="fas"> ${abbreviate(l.league_name)}</i> </span>
            </div>
            <div class="">
            <i class="fas">${l.event_status.replace(/half time/gi, "HT").replace(/finished/gi, "FT").replace(/postponed/gi, "PP")}</i>
                <span class="blinker2"> ${l.event_status.length > 5 ? "" : "'"} </span>
            </div>
            <div class="home yellow ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].home_scorer.length > 0 ? "ss" : ""}">
            <i class="fas gf">${l.event_home_team} </i>
            ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].home_scorer.length > 0 ? '<i class=" yellow mx-1 fas fa-futbol"> ' + l.goalscorers[l.goalscorers.length - 1].home_scorer + '</i>' : ""}
            </div>
            <div class="score-wrap2"><a href="/info/${l.event_key}">${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away yellow ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].away_scorer.length > 0 ? "ss" : ""}">
            ${l.goalscorers.length > 0 && l.goalscorers[l.goalscorers.length - 1].away_scorer.length > 0 ? '<i class=" yellow mx-1 fas fa-futbol"> ' + l.goalscorers[l.goalscorers.length - 1].away_scorer + '</i>' : ""}
            <i class="fas gf">${l.event_away_team}</i>
            </div>
            <div></div>
        </div>
        `;
        }
        else {
            allMatchesHtml += `<div class="match" key="${l.event_key}">
            <div class="event-info">
                <span class="green league-name"> <i fas="fas">${abbreviate(l.league_name)}</i> </span>
            </div>
            <div class="">
            <i class="fas">${l.event_status ? l.event_status.replace(/half time/gi, "HT").replace(/finished/gi, "FT").replace(/postponed/gi, "PP") : l.event_time}</i>
            </div>
            <div class="home gf">
            <i class="fas">${ l.event_home_team}</i>
            </div>
            <div class="score-wrap2"><a href="/info/${l.event_key}">${l.event_final_result} ${l.event_halftime_result ? " <span class='dark'>" + " (" + l.event_halftime_result + "<span/>" + ")" : ""}</a></div>
            <div class="away gf">
            <i class="fas">${ l.event_away_team}</i>
            </div>
            <div></div>
        </div>
        `;
        }
    });

    // await data.livescores.forEach(l => {
    //     if (l.event_live == 1) {
    //         allMarquees += `
    //         <div>${l.event_home_team}</span><span class="score-wrap"><span>${l.event_final_result[0]}</span>:<span>${l.event_final_result[l.event_final_result.length - 1]}</span></span><span>${l.event_away_team}</div>
    //         `;
    //     }
    //     else {
    //         allMarquees += `
    //         <div>${l.event_home_team}</span><span class="score-wrap"><span>-</span>:<span>-</span></span><span>${l.event_away_team}</div>
    //         `;
    //     }
    // });

    matches1.innerHTML = allMatchesHtml1 + allMatchesHtml;
    // marquee.innerHTML = allMarquees;

}

export default render;