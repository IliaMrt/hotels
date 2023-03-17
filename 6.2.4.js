let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
}

function printListRecursion(inp) {
    console.log(inp.value);
    if (inp.next != null) printListRecursion(inp.next)
}

function printListCycle(inp){
    for (let inpKey in inp) {
        console.log(inpKey);
    }
}

printListRecursion(list)