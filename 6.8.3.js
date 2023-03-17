'use strict'

function sayHi() {
    console.log( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
    name: "Вася"
});

alert( bound.test ); // что выведет? почему? - alert is not defined. Because no in context in .bind.