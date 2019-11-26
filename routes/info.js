const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../keys/api").football_api;

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    // API CALL
    const tableURI = `https://allsportsapi.com/api/football/?&met=Standings&leagueId=${195}&APIkey=${API_KEY}`;
    const url1 = `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=${API_KEY}&from=${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}&to=${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    rp.get(url1)
        .then((async data => {
            const match = JSON.parse(data).result.filter(e => e.event_key == id)[0];
            // await rp.get(tableURI)
            //     .then(data => console.log(JSON.parse(data).result));
            console.log(match)
            return res.render("matchDetails", { match })
        }))
        .catch(err => console.log(err))
});

module.exports = router;