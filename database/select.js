const {QUERY} = require('./util');

const listTest = (commerce, search) => {
    return QUERY`
    SELECT * FROM test WHERE product_commerce = ${commerce} AND product_search = ${search} ORDER BY id 
    `;
}

const listSearchTest = () => {
    return QUERY`
    SELECT DISTINCT product_search FROM test
    `
}

const check_search_test = (commerce, search) => {
    return QUERY`
    SELECT * FROM test WHERE product_commerce = ${commerce} AND product_search = ${search} 
    `;
}

const check_data_test = (input) => {
    return QUERY`
    SELECT  * FROM test WHERE product_image = ${input.product_image} 
    `;
}

const checkUser = (user) => {
    return QUERY`
    SELECT * FROM admin_user WHERE admin_id = ${user.admin_id} AND admin_pw = ${user.admin_pw}
    `;
}

module.exports = {listTest, listSearchTest, check_search_test, check_data_test, checkUser};