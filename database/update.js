const {QUERY} = require('./util');
const {objectEqual} = require('../util/objectEqual');
const {createTest} = require('../database/insert');


const updateTest = (data, product) => {
    return QUERY`
    UPDATE test SET product_name = ${data.product_name}, product_price = ${data.product_price}, product_image = ${data.product_image},
     product_commerce = ${data.product_commerce}
    WHERE id = ${product.id};
    `
}

const updateData = async (data, product) => {
    for (let i = 0; i < data.length; i++) {
        let check = await objectEqual(data[i], product[i]);
        if (!check) {
            if (product[i] == undefined) await createTest(data[i]);
            else if (data[i] == undefined) return 0;
            else await updateTest(data[i], product[i]);
        }
    }
}


module.exports = {updateData};