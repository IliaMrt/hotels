function fibRecursion(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

function fib(n) {
    let n1 = 1, n2 = 1, n3 = 1;
    for (let i = 2; i < n; i++) {

        n3 = n2 + n1;
        n1 = n2;
        n2 = n3;

    }
    return n3;
}

console.log(fib(3)); // 2

console.log(fib(7)); // 13
console.log(fib(77)); // 5527939700884757