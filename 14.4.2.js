let obj, method;

obj = {
    go: function () {
        console.log(this);
    }
};
// let k={'popa':1}
obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined в этом вызове this=global, а не obj

(obj.go || obj.stop)(); // (4) undefined и тут тоже