let f = debounce(console.log, 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout(() => f(4), 1100); // выполняется
setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

function debounce(func, delay) {
    let running = false;

    return function (){
        if (running) return;
        running=true;
        func.apply(this,arguments);
        setTimeout(()=>running=false,delay);
    }
}





function debounce1(func, delay) {
    let flag=false;
    return function () {
        if (flag) return;
        func.apply(this,arguments);
        flag=true;
        setTimeout(() => flag=false, delay)
    }
}