function f(x) {
    console.log((x));
}

// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс

function delay(f, d) {

    return function () { setTimeout( () => f.apply(this, arguments), d)}


}


function delay1(func, dl) {
    return function () {
        setTimeout(() => func.apply(this, arguments), dl)
    }
}