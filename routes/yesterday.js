const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../keys/api").football_api;


// partial function
function abbreviate(league) {
    let result = "";
    league.split(" ").forEach(e => {
        result += e[0];
    })
    return result;
};

// home route
router.get("/", async (req, res) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    // API CALL
    const url3 = `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=${API_KEY}&from=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&to=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    rp.get(url3)
        .then(async response => {
            let unsorted = JSON.parse(response).result
            // compare func
            function compare(a, b) {
                m1 = new Date(`${date.toDateString()} ${a.event_time}:0`);
                m2 = new Date(`${date.toDateString()} ${b.event_time}:0`);
                if (m1 < m2) {
                    return -1;
                }
                if (m1 > m2) {
                    return 1;
                }
                return 0;
            }
            // sort
            // const livescores = await unsorted.sort(compare);
            const matches = await unsorted.sort(compare);
            return res.render('yesterday', { matches, abbreviate })
        }).catch(err => console.log(err));
});

module.exports = router;
