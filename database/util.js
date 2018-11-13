const {PostgreSQL} = require('mql2');
const {CONNECT} = PostgreSQL;
const dbInfo = require('../config/dbinfo');
const POOL = CONNECT({
    host: dbInfo.host,
    user: dbInfo.user,
    password: dbInfo.password,
    database: dbInfo.database
});
const { QUERY } = POOL;


module.exports = { QUERY };