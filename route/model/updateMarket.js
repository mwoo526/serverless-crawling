const {listTest} = require('../../database/select');
const {updateData} = require('../../database/update');

const updateMarket = (searchTerm, market, crawling) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await crawling(searchTerm);

            const product = await listTest(market, searchTerm);
            await updateData(data, product);
            console.log(`${market} ${searchTerm} 업데이트`);
            resolve(searchTerm);
        } catch (e) {
            reject(e.message);
        }
    })
}

module.exports = {updateMarket};