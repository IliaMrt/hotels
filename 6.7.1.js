function work(a, b) {
    console.log(a + b); // произвольная функция или метод
}

work = spy(work);
work.calls = []

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
    console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}

function spy1(f) {


    function w(...args) {
        w.calls.push(args);
        return f.apply(this, args);
    }

    w.calls = [];
    return w;
}

function spy(f) {

    spy.calls = [];

    function wrapper() {
        spy.calls.push(arguments);
        f.apply(this, arguments);
    }

    return wrapper;

}