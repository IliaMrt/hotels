let user = {
    name: "John",
    go: function () {
        console.log(this.name)
    }
};//смешно не забываем ставить точки с запятой, иначе - фиг отловишь
(user.go)();

