function f(a) {
    console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
function throttle(func,delay) {
    let a;
    let t;
    return function (){
        if (!a) func.apply(this,arguments);
        a=arguments;
        t=this;
        setTimeout(()=>{if (a){func.apply(t,a);a=t=undefined}},delay)
    }

}



function throttle1(func,delay){
    let flag1=false;
    let flag2=false;
    return function (){
        if (flag1) return;
        setTimeout(()=>{
            flag1=true;
            func.apply(this,arguments);
        },delay)
        if (flag2)  setTimeout(()=>{
            flag2=false;
            func.apply(this,arguments);
        },0)
    }

}