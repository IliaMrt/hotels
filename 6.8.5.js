'use strict'

function askPassword(ok, fail) {
    let password = 'rockst1ar'//prompt("Password?", '');
    if (password == "rockstar") ok();
    else fail();
}

let user = {
    name: 'John',

    login(result) {
        console.log( this.name + (result ? ' logged in' : ' failed to log in') );
    }
};

function partial(func, ...argsBound) {
    return function(...args) { // (*)
        return func.call(user, ...argsBound, ...args);
    }
}

user.ok=partial(user.login,true)
user.fail=partial(user.login,false)

//askPassword1(user.ok, user.fail); // ?

askPassword(user.login.bind(user,true), user.login.bind(user,false)); // ?

