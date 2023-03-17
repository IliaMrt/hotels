'use strict'
function Rabbit() {}
Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

 Rabbit.prototype = {};


console.log( rabbit.eats ); // true
Rabbit.prototype.eats = false;
let rabbit2 = new Rabbit();

console.log( rabbit.eats ); // true
console.log( rabbit2.eats ); // true
delete rabbit.eats;
console.log( rabbit.eats ); // true

delete Rabbit.prototype.eats;
console.log( rabbit.eats ); // true
