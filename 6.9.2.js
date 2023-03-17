function f(a, b) {
    console.log( a + b );
}

Function.prototype.defer = function(ms) {
    let t=this
    return function () {setTimeout(()=>t.apply(this,arguments), ms)};
};

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
