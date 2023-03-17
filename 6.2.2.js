function factorial(inp){
    return inp==1?1:inp*factorial(inp-1);
}

console.log(factorial(4))