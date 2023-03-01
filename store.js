let database = [];

let checkConditions = {

  string: function (name, request, obj) {

    let [question, word] = request.split('-');

    switch (question) {
      case 'contains':
        return obj[name].indexOf(word) >= 0 ? true : false;
      case 'starts':
        return obj[name].indexOf(word) == 0 ? true : false;
      case 'end':
        return obj[name].lastIndexOf(word) == obj[name].length - word.length ?
          true : false;
    }

  },

  number: function (name, request, obj) {

    let number;
    let question;

    if (request[1] == '=') {
      number = request.slice(2,);
      question = request[0] + request[1];
    } else {
      number = request.slice(1,);
      question = request[0];
    }

    switch (question) {
      case ">":
        return +number < +obj[name];
      case "<":
        return +number < +obj[name];
      case "<=":
        return +number >= +obj[name];
      case ">=":
        return +number <= +obj[name];
      case"=":
        return +number == +obj[name];

    }

    return false;

  },

}

export function searchGoods(input) {

  if (typeof (input) != "string") return undefined;

  let resultArr = [];
  let arrOfQuestion = [];

  arrOfQuestions = getArrayOfQuestions(input);

  database.forEach(good => {

    let checkResult = true;

    arrOfQuestions.forEach(question => {

      checkResult = checkResult &&
        checkConditions[question.method](question.field, question.request, good);

    });

    if (checkResult) resultArr.push(good);

  })

  return resultArr;

}

function getArrayOfQuestions(request) {

  let tempArr = request.split('&');
  let resArr = [];

  tempArr.forEach(item => {

    let temp = item.split('-')
    let tempObj = {};

    if (temp[0] == 'quantity' || temp[0] == 'price') {
      tempObj = {method: "number", field: temp[0], request: temp[1]}
    } else {
      tempObj = {method: "string", field: temp[0], request: (temp[1] + '-' + temp[2])}
    }

    resArr.push(tempObj);

  });

  return resArr;

}

class Goods {

  constructor(name, price, quantity, description) {

    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.description = description;

    database.push(this)

  }
}

let good1 = new Goods('pan', 2);
let good2 = new Goods('pot', 4);
let good3 = new Goods('frypan', 1, 'very bad');
let good4 = new Goods('fdpot', 4, 5, 'good');
let good5 = new Goods('fdpot1', 4, 500, 'bad');
let good6 = new Goods('fdpot', 4, 17, 'not good');
let good7 = new Goods('fdpot', 4, 6, 'not bad');
let good8 = new Goods('fdpot', 4, -17, 'not bad');