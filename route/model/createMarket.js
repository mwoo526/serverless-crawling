const {create_test} = require('../../database/insert');
const {check_search_test, check_data_test} = require('../../database/select');


const createMarket = (searchTerm, market, crawling) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await check_search_test(market, searchTerm);

            if (check[0] == null) {
                const data = await crawling(searchTerm);

                for (let i = 0; i < data.length; i++) {
                    let result = await check_data_test(data[i]);
                    if (result[0] == null) {
                        await create_test(data[i]);
                    }
                }

                resolve(searchTerm);
            }
            reject(market);
        } catch (e) {
            reject(e.message);
        }
    });
}

module.exports = {createMarket};