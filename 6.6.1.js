function printNumbers(from, to) {
    let i = from;

    let timer = setInterval(() => {
        if (i == to) {
            clearInterval(timer);
            return;
        }
        console.log(i)
        i++
    }, 1000);


}

function printNumbers1(from, to) {
    let counter = from;
    setTimeout(function go() {
            console.log(counter);
            if (counter < to) {
                setTimeout(go, 1000)
            }
            counter++;
        }, 1000
    );


}

printNumbers1(1, 4);
