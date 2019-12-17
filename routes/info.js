const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../keys/api").football_api;

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    // API CALL
    const oddURI = `https://allsportsapi.com/api/football/?&met=Odds&matchId=${id}&APIkey=${API_KEY}`;
    // const tableURI = `https://allsportsapi.com/api/football/?&met=Standings&leagueId=${195}&APIkey=${API_KEY}`;
    const url1 = `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=${API_KEY}&matchId=${id}`;


    try {
        const matchreq = rp.get(url1);
        const oddreq = rp.get(oddURI);
        await Promise.all([matchreq, oddreq])
            .then(([matches, odd]) => {
                const odds = JSON.parse(odd);
                const match = JSON.parse(matches).result.filter(e => e.event_key == id)[0];
                if (odds.result) {
                    const odds = JSON.parse(odd).result[`${id}`][0];
                    return res.render("matchDetails", { match, odds });
                }
                return res.render("matchDetails", { match, odds: null });
            })
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;