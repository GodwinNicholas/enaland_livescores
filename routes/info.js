const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../keys/api").football_api;

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    // API CALL
    const url = `https://allsportsapi.com/api/football/?met=Countries&APIkey=${API_KEY}`;
    const url2 = `https://allsportsapi.com/api/football/?met=Livescore&APIkey=${API_KEY}`;
    rp.get(url)
        .then(response => {
            countries = JSON.parse(response).result;
            return countries;
        })
        .then((countries) => {
            rp.get(url2)
                .then(response => {
                    const info = JSON.parse(response).result.filter(e => e.event_key === id);
                    console.log(info)
                    return res.render("matchDetails", { countries, info })
                })
        })
        .catch(err => console.log(err))
});

module.exports = router;