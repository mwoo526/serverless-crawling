const objectEqual = (data, product) => {

    if(!(data instanceof Object) || !(product instanceof Object)) return false;

    for(let key in data){
        if(!product.hasOwnProperty(key)) return false;
        if(data[key] !== product[key]) return false;
    }
    return true;
}

module.exports = { objectEqual };
