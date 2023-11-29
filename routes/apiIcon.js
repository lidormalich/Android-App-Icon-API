var express = require('express');
var router = express.Router();
const cheerio = require("cheerio")
const axios = require('axios');

const webScraperImage = async (appPkgName, langugeCode = "en_US") => {
    const url = `https://play.google.com/store/apps/details?id=${appPkgName}&hl=${langugeCode}`;
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);
    let data = [];
    $("div .Mqg6jb img").each((i, elem) => {
        let img = $(elem).attr("src")
        data.push(img)
        // data["img"] = img;
    });
    return data
}
const webScraperDesc = async (appPkgName, langugeCode = "en_US") => {
    const url = `https://play.google.com/store/apps/details?id=${appPkgName}&hl=${langugeCode}`;
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);
    let data = [];

    $("div .SfzRHd").each((i, elem) => {
        // data.push($(elem))
        data = $(elem).text()
        console.log({ elem: data });
    });
    return data
}
const webScraperTitle = async (appPkgName, langugeCode = "en_US") => {
    const url = `https://play.google.com/store/apps/details?id=${appPkgName}&hl=${langugeCode}`;
    const html = await axios.get(url);
    const $ = await cheerio.load(html.data);
    let data = "";

    $("div .Fd93Bb").each((i, elem) => {
        // data.push($(elem))
        data = $(elem).text()
        console.log({ elem: data });
    });
    return data
}
router.get('/', async function (req, res) {

    return res.status(200).send("allUser");

});
router.get('/image/:app', async function (req, res) {
    const appPkgName = req.params.app;
    try {
        const pkgImgGoogle = await webScraperImage(appPkgName);
        return res.status(200).send(pkgImgGoogle[0]);
    } catch (error) {
        res.status(404).send("")
    }
});
router.post('/desc/:app/', async function (req, res) {
    const appPkgName = req.params.app;
    const languge = req.body.languge;
    try {
        const pkgImgGoogle = await webScraperDesc(appPkgName, languge || "");
        return res.status(200).send(pkgImgGoogle);
    } catch (error) {
        res.status(404).send("")
    }

});
router.post('/title/:app/', async function (req, res) {
    const appPkgName = req.params.app;
    const languge = req.body.languge;
    try {
        const pkgImgGoogle = await webScraperTitle(appPkgName, languge || "");
        return res.status(200).send(pkgImgGoogle);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
});


module.exports = router;
