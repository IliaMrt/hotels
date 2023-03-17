new Promise(function(resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(console.log('1'));

//теоретически .catch не должен срабатывать,
//т.к. он перехватывает только синхронные ошибки
// но webstorm обрабатывает и то, и другое..
// интересно, почему?

// /10.4.1.js
// 1
// /root/WebstormProjects/learn/10.4.1.js:3
// throw new Error("Whoops!");
// ^
//
// Error: Whoops!
//     at Timeout._onTimeout (/root/WebstormProjects/learn/10.4.1.js:3:15)
// at listOnTimeout (internal/timers.js:557:17)
// at processTimers (internal/timers.js:500:7)
//
// Process finished with exit code 1
