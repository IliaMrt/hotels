let user = {
    name: "John"
};

function wrap(target) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            if (prop in target) {
                return Reflect.get(target, prop, receiver)
            } else {
                return 'Ошибка: такого свойства не существует'
            }
        }
    });
}

user = wrap(user);

console.log(user.name); // John
console.log(user.age); // Ошибка: такого свойства не существует