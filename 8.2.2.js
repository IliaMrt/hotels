'use strict'
function Obj(){
    this.name='poow'
};
let Obj4={
    name:'hren'
}
let Obj5={
    name:'hren2'
}
let obj=new Obj();

console.log(obj.name)
obj.prototype=Obj4;
console.log(obj.name)
delete obj
console.log(obj.name)

/*
 function Obj3(){
     this.name='poow3'
 };
 function Obj2(){
     //this.prototype={Obj3}
     this.name='poow2'
 };
let obj=new Obj();
console.log(obj.name)

 obj.prototype={};
console.log(obj.name)
obj.prototype=Obj2;
console.log(obj.name)
Obj.prototype={};
console.log(obj.name)
Obj.prototype.constructor={name:'he'};
console.log(obj.name)
*/

//obj.prototype=Obj2;
// let obj2 = new obj.constructor;
// obj2.prototype=Obj;
// console.log(obj2.name)

/*

let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

console.log( rabbit.eats ); // true*/
