const router = require('express').Router();
const rp = require("request-promise");
const cheerio = require("cheerio");
const API_KEY = require("../../keys/api").football_api;

router.get("/", (req, res) => {

    const url = `https://www.skysports.com/football/news`;


    let data = [];


    rp.get(url)
        .then(res => {
            const $ = cheerio.load(res);
            $(".news-list .news-list__headline").each((i, el) => {
                data.push($(el).text());
            })
            return data;
        }).then((data) => res.send(data))
});


router.get("/headline", (req, res) => {
    const url = `https://www.skysports.com/football/news`;


    let data = [];


    rp.get(url)
        .then(res => {
            const $ = cheerio.load(res);
            $(".news-list .news-list__item").each((i, el) => {
                const fnews = cheerio.load(el);
                data.push({
                    imgURL: fnews(".news-list__figure img").attr('data-src').trim(),
                    title: fnews(".news-list__headline").text().trimLeft()
                });
            })
            return data;
        }).then((data) => res.send(data))
});



router.get("/highlights", (req, res) => {
    const url = `https://allsportsapi.com/api/football/?&met=Videos&eventId=76387&APIkey=${API_KEY}`;


    let data = [];


    rp.get(url)
        .then(async res => {
            const data = JSON.parse(res).result;
            await data.forEach(e => data.push({
                video_title: `${e.video_title.trim()} - ${e.video_title_full}`,
                video_url: e.video_url
            }));
            return data;
        }).then((data) => res.send(data))
})




module.exports = router;