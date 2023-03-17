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

function printListRecursionRev(inp) {
    if (inp.next != null) printListRecursionRev(inp.next);
    console.log(inp.value);

}

function printListCycleRev(inp) {
    let rez = [];
    let next = inp;
    while (next) {
        rez.push(next.value);
        next = next.next;
    }
    for (let i = rez.length - 1; i >= 0; i--) {
        console.log(rez[i])

    }
}

printListRecursionRev(list)
printListCycleRev(list)