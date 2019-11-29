const router = require("express").Router();
const rp = require("request-promise");
const API_KEY = require("../../keys/api").football_api;


// home route
router.get("/", async (req, res) => {
    // API CALL
    // const url = `https://allsportsapi.com/api/football/?met=Countries&APIkey=${API_KEY}`;
    // const url2 = `https://allsportsapi.com/api/football/?met=Livescore&APIkey=${API_KEY}`;
    const url3 = `https://allsportsapi.com/api/football/?met=Fixtures&APIkey=${API_KEY}&from=${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}&to=${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    rp.get(url3)
        .then(async response => {
            let unsorted = JSON.parse(response).result
            // compare func
            function compare(a, b) {
                m1 = new Date(`${new Date().toDateString()} ${a.event_time}:0`);
                m2 = new Date(`${new Date().toDateString()} ${b.event_time}:0`);
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
