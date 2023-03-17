function sumToRecursion(inp){
    return inp>1?inp+sumToRecursion(inp-1):1;
}

function sumToCycle(inp) {
    let res=0;
    for (let i = 1; i <= inp; i++) {
        res = res + i;
    }
    return res;
}


function sumToFormula(inp) {
    return (inp*inp+inp)/2;
}




console.log((sumToRecursion(10)));
console.log((sumToCycle(10)));
console.log((sumToFormula(10)));