// 1. curry

function curry(fn) {

    // ! 주의 화살 함수로 작성시 arguments.length 을 인식 못함
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
    }
}

// 2. curryr

function curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}

// 3. get

let get = curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
})

// 4. isObject

function isObject(obj) {
    // !! -> 값이 null 이거나 undefined 일때 false
    return typeof obj == 'object' && !! obj;
}

// 5. keys

function key(obj) {
    return isObject(obj) ? Object.keys(obj) : {} ;
}

// 6. each
// object의 키에 대한 값의 수행을 반복적으로 실행
function each(list, iter) {
    let keys = key(list);
    for(let i = 0; i < keys.length; i++){
        iter(list[keys[i]], keys[i]);
    }
    return list;
}

// 7. filter
// 조건
function filter(list, predi) {
    let new_list = [];
    each(list, (val) => {
        if(predi(val)) new_list.push(val);
    })
    return new_list;
}

// 8. map

function map(list, mapper) {
    let new_list = [];
    each(list, (val, key) => {
        new_list.push(mapper(val, key));
    });
    return new_list;
}

var map = curryr(map),
    each = curryr(each),
    filter = curryr(filter);

// 9. rest
let slice = Array.prototype.slice;
function rest(list, num){
    // call() 두번째 인자 default를 1 로 설정
    return slice.call(list, num || 1);
}

function rest2(list, num){
    // call() 두번째 인자 default를 1 로 설정
    return slice.call(list, num || 2);
}

// 10. reduce
function reduce(list, iter, memo){
    if(arguments.length == 2){
        memo = list[0];
        list = rest(list);
    }
    each(list, (val) => {
        memo = iter(memo, val);
    });
    return memo;
}

// 11. pipe
function pipe() {
    let fns = arguments;
    return function(arg) {
        return reduce(fns, function(arg, fn){
            return fn(arg);
        }, arg);
    }
}


// 12. go
function go(arg) {
    let fns = rest(arguments);
    return pipe.apply(null, fns)(arg);
}


module.exports = { get, map, go , rest, rest2};