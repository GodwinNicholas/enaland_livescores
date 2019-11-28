const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../../keys/api").football_api;


// home route
router.get("/", async (req, res) => {
    // API CALL
    const url = `https://allsportsapi.com/api/football/?met=Countries&APIkey=${API_KEY}`;
    const url2 = `https://allsportsapi.com/api/football/?met=Livescore&APIkey=${API_KEY}`;
    const url3 = `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=${API_KEY}&from=2019-11-28&to=2019-11-28`;
    rp.get(url3)
        .then(async response => {
            let unsorted = JSON.parse(response).result
            // compare func
            function compare(a, b) {
                m1 = new Date(`28 November 2019 ${a.event_time}:0`);
                m2 = new Date(`28 November 2019 ${b.event_time}:0`);
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
            const livescores = await unsorted.sort(compare);
            return res.send({ livescores })
        }).catch(err => console.log(err));
});

module.exports = router;