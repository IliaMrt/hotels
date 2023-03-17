function makeCounter1() {
    let count = 0;

    function t() {
        return count++;
    }

    t.set = (val) => count = val;
    t.decrease = () => count - 1;
    return t;

}

function makeCounter2() {
    function t() {
        return makeCounter2.count++;
    };
    t.set = (val) => makeCounter2.count = val;
    t.decrease = () => makeCounter2.count - 1;
    return t
}

let counter = makeCounter2();
// let counter2 = makeCounter();

// console.log(counter()); // 0
// console.log(counter()); // 1
console.log(counter.set(14)); //
console.log(counter.decrease()); //

// console.log(counter2()); // 0
// console.log(counter2()); // 1