const { QUERY } = require('./util');

const create_test = function(input){
    return QUERY`
    INSERT INTO test ("product_name", "product_price", "product_image", "product_url", "product_commerce", "product_search") 
    values (${input.product_name}, ${input.product_price}, ${input.product_image}, ${input.product_url}, ${input.product_commerce}, ${input.product_search})

`;
}

module.exports = {
    create_test
}