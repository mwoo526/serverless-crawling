const cron = require('node-cron');
const { elevenCrawling, gmarketCrawling, auctionCrawling, wemakerCrawling, ssgCrawling } = require('../util/crawling');
const { updateMarket } = require('../route/model/updateMarket')
const { listSearchTest } = require('../database/select');
const { get, map, go } = require('../js/fp');

let scheduler = function () {

    cron.schedule('00 00 00 * * *',async function () {

        const searchTerm = go(
            await listSearchTest(),
            map(get('product_search')));

        try {
            for(let i = 0; i < searchTerm.length; i++) {
                console.log(`-----[${searchTerm[i]}] 업데이트------`);
                await updateMarket(searchTerm, "eleven", elevenCrawling);
                await updateMarket(searchTerm, "gmarket", gmarketCrawling);
                await updateMarket(searchTerm, "auction", auctionCrawling);
                await updateMarket(searchTerm, "wemaker", wemakerCrawling);
                await updateMarket(searchTerm, "SSG", ssgCrawling);
            }
            console.log("-----스케줄링 종료------");
        } catch (e) {
            console.log(e.message);
        }
    },{
        timezone: "Asia/Seoul"
    });

};


module.exports = { scheduler };