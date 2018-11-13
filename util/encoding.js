const iconv = require('iconv-lite');

const eucKrEncoding = (searchTerm) => {
// euc-kr 인코딩
    let buf = iconv.encode(searchTerm, "euc-kr");
    let encodeStr = '';
    for (let i = 0; i < buf.length; i++) {
        encodeStr += '%' + buf[i].toString('16');

    }
    encodeStr = encodeStr.toUpperCase();
    return encodeStr;

}


module.exports = { eucKrEncoding };