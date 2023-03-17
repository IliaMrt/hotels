console.log(JSON.parse(sum(1)(2))); // 1 + 2
console.log(JSON.parse(sum(1)(2)(3))); // 1 + 2 + 3
console.log(JSON.parse(sum(5)(-1)(2)));
console.log(JSON.parse(sum(6)(-1)(-2)(-3)));
console.log(JSON.parse(sum(0)(1)(2)(3)(4)(5)));

function sum(a) {
    let rez = a;

    function f(b) {
         rez += b;
        return f;
    }

    f.toString = function () {
        return rez;
    }
    return f;
}