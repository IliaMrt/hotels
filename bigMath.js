function test() {

  let counter = 0;
  let diffErr = 0;
  let summErr = 0;
  let divErr = 0;
  let multErr = 0;

  console.log('Test started')

  for (let i = 0.1; i <= 50; i += 0.1) {
    for (let j = 0.1; j <= 25; j += 0.1) {

      let ii = (i + Math.random()) * (Math.random() > 0.5 ? 1 : -1);
      let jj = (j + Math.random()) * (Math.random() > 0.5 ? 1 : -1);

      counter += 4;

      let x = bigDiv(String(ii), String(jj));
      let y = String((ii / jj).toFixed(5));
      if (x.slice(0, 4) != y.slice(0, 4)) {
        console.log(`err. ${ii}/${jj}, get ${x}, wait ${y}`);
        divErr++;
      }

      x = bigDiff(String(ii), String(jj));
      y = String((ii - jj).toFixed(5));
      if (x.slice(0, 4) != y.slice(0, 4)) {
        console.log(`err. ${ii}-${jj}, get ${x}, wait ${y}`);
        diffErr++
      }

      x = bigSumm(String(ii), String(jj));
      y = String((ii + jj).toFixed(5));
      if (x.slice(0, 4) != y.slice(0, 4)) {
        console.log(`err. ${ii}+${jj}, get ${x}, wait ${y}`);
        summErr++
      }

      x = bigMult(String(ii), String(jj));
      y = String((ii * jj).toFixed(5));
      if (x.slice(0, 4) != y.slice(0, 4)) {
        console.log(`err. ${ii}*${jj}, get ${x}, wait ${y}`)
        multErr++
      }
    }
  }

  console.log(`${counter} test passed OK`)
  console.log(`we have \n${multErr} multiplication errors,\n${divErr} divide errors,
  \n${summErr} summ errors,\n${diffErr} diff errors,`);
}

function bigDiv(str1, str2, aproximate) {

  let obj = normalizeInput(str1, str2);
  let a = obj.str1.str;
  let b = obj.str2.str;
  let result = ''
  let counter;

  if (b == '0') return Infinity;
  if (a == '0') return '0';

  let maxPoint = Math.max(obj.str1.point, obj.str2.point);
  if (aproximate < 5 || aproximate == undefined) aproximate = 5;
  let targetAccuracy = aproximate || maxPoint;
  let currenAccuracy = 0;

  let x, register;
  if (isXbiggerY(b, a)) {
    let tempA = a + '0'.repeat(b.length - a.length);
    if (isXbiggerY(b, tempA)) {
      x = b.length - a.length + 1;
    } else {
      x = b.length - a.length;
    }
    register = -x + obj.str2.point - obj.str1.point;
  } else {
    if (isXbiggerY(a.slice(0, b.length), b)) {
      x = b.length;
    } else {
      x = b.length + 1;
    }
    register = a.length - x + obj.str2.point - obj.str1.point;
  }

  while (isXbiggerY(b, a)) {
    a += '0';
    currenAccuracy++;
    targetAccuracy++;
  }

  let end = a.length - 1;
  let pointer = b.length - 1;

  let currentDiff = a.slice(0, pointer + 1);

  if (isXbiggerY(b, currentDiff)) {
    pointer++;

    currentDiff += a[pointer];
  }

  do {

    while (isXbiggerY(b, currentDiff) && pointer < end) {

      pointer++;
      result += '0';


      while (pointer + 1 == end && currenAccuracy < targetAccuracy) {
        end++;
        a += '0';
        currenAccuracy++;

      }

      if (currentDiff == '0') {
        if (a[pointer] != '0') {
          currentDiff = a[pointer];
        }
      } else {
        currentDiff += a[pointer];
      }
    }

    counter = 0;
    let flag = false;
    while (isXbiggerY(currentDiff, b) || currentDiff == b) {
      flag = true;
      counter++;
      currentDiff = bigDiff(currentDiff, b);
    }

    if (flag) {
      result += String(counter);
    } else {
      result += '0';
    }
    pointer++;

    while (pointer >= end && currenAccuracy < targetAccuracy) {
      end++;
      a += '0';
      currenAccuracy++;
    }

    if (pointer < end) {
      if (currentDiff != '0') {
        currentDiff += a[pointer]
      } else {
        currentDiff = a[pointer]
      }
    }


  } while (pointer < end);

  counter = 0;
  let flag = false;
  if (a[pointer] != undefined) {
    currentDiff = currentDiff + a[pointer];
  }
  while (isXbiggerY(currentDiff, b) || currentDiff == b) {
    flag = true;
    counter++;
    currentDiff = bigDiff(currentDiff, b);
  }

  if (register >= 0) {
    result = result.slice(0, register + 1) + '.' + result.slice(register + 1)
  } else {
    result = '0.' + '0'.repeat(-1 - register) + result;
  }

  let resultSign = '';
  if (obj.str1.sign * obj.str2.sign < 0) resultSign = '-';

  return resultSign + result;

}

function isXbiggerY(x, y) {
  while (x.length > 1 && x[0] == '0') {
    x = x.slice(1)
  }

  while (y.length > 1 && x[0] == '0') {
    y = y.slice(1)
  }

  return compare({str: x, sign: 1, point: 0}, {str: y, sign: 1, point: 0});
}

function bigDivOld(str1, str2) {

  let obj = normalizeInput(str1, str2);

  if (obj.str2.str == '0') return Infinity;
  if (obj.str1.str == '0') return '0';
  if (!compareWithoutSign(obj.str1, obj.str2)) return 0;

  let currentResult = obj.str1.str;
  let counter = '0';

  while (currentResult[0] != '-') {
    currentResult = bigDiff(currentResult, obj.str2.str);
    counter = bigSumm(counter, '1');
  }

  let resultSign = '';
  if (obj.str1.sign * obj.str2.sign < 0) resultSign = '-';

  return resultSign + bigDiff(counter, 1);

}

function bigDivInteger(str1, str2) {
  let result = '';
  let counter = 0;
  let obj = normalizeInput(str1, str2);
  let currentDiff;
  if (obj.str2.str == '0') return Infinity;
  if (obj.str1.str == '0') return '0';

  let endPosition = obj.str1.str.length - 1;
  let startPosition = obj.str2.str.length - 1;

  if (!compareWithoutSign(obj.str1, obj.str2)) return 0;

  let currentDivided = obj.str1.str.slice(0, startPosition + 1);
  if (compareWithoutSign(obj.str2, {str: currentDivided, sign: 1, point: 0})) {
    startPosition++
    currentDivided = obj.str1.str.slice(0, startPosition + 1);
  }

  do {
    if (compareWithoutSign(obj.str2, {str: currentDivided, sign: 1, point: 0})) {
      startPosition++
      currentDivided += obj.str1.str[startPosition];
      continue
    }

    currentDiff = currentDivided;

    do {
      currentDiff = bigDiff(currentDiff, obj.str2.str);
      counter++
    }
    while (compareWithoutSign({str: currentDiff, sign: 1, point: 0}, obj.str2) || currentDiff == obj.str2.str) ;

    result += String(counter)
    counter = 0;
    startPosition++;
    currentDivided = currentDiff;
    currentDivided = checkZero(currentDivided);

    if (currentDivided != '0' && startPosition < obj.str1.str.length - 1) {
      currentDivided += obj.str1.str[startPosition];
    }

//compareWithoutSign(obj.str2, {str: currentDivided, sign: 1, point: 0})

    while (currentDivided == '0' && startPosition != endPosition) {

      currentDivided += obj.str1.str[startPosition];
      //currentDivided = checkZero(currentDivided);
      result += '0';
      startPosition++
    }

  } while (startPosition <= endPosition);
  if (!compareWithoutSign(obj.str2, {str: currentDivided, sign: 1, point: 0})) {
    counter = 0;
    do {
      currentDivided = bigDiff(currentDivided, obj.str2.str);
      counter++
    }
    while (compareWithoutSign({str: currentDivided, sign: 1, point: 0}, obj.str2)) ;
    result += String(counter);


  }
  return result;
}

function checkZero(value) {
  return value = '0'.repeat(value.length - 1) ?
    '0' :
    value;
}

function bigDivWithFloat(str1, str2, approximate) {

  let result = '';
  let obj = normalizeInput(str1, str2);

  if (!(isFinite(approximate) || approximate == undefined))
    return NaN;
  if (obj.str2.str == '0') return Infinity;
  if (obj.str1.str == '0') return '0';

  let shift = 0;

  let endPosition = (obj.str1.str.length - obj.str1.point + approximate) ||
    (obj.str1.str.length - obj.str1.point + Math.max(obj.str1.point, obj.str2.point));

  let counter = 0;
  let startPosition = obj.str2.str.length - 1;
  readyToCalculate = 0;

  let number1, number2;
  number1 = obj.str1.str.slice(0, obj.str2.str.length);// - 1);

  while (startPosition < endPosition) {

    if (!compare({str: number1, sign: 1, point: 0}, obj.str2)) {
      counter++
      number1 += obj.str1.str[startPosition + counter];
      continue;
    }

    let currentNumber = 0;
    let buffer = number1;

    do {
      buffer = bigDiff(buffer, obj.str2.str);
      currentNumber++;

    } while (compare({str: buffer, sign: 1, point: 0}, obj.str2));
    // } while (buffer[0] != '-');

    result += String(currentNumber - 1);


    startPosition += counter + 1;
    number1 = buffer.slice(1) + obj.str1.str[startPosition]
    counter = 0;

  }

  let resultSign = '';
  if (obj.str1.sign * obj.str2.sign < 0) resultSign = '-';

  return resultSign + result;

}

function bigMult(str1, str2) {

  let obj = normalizeInput(str1, str2);
  let shift;

  if (obj.str1.point > obj.str2.point) {
    obj.str2.str += '0'.repeat(obj.str1.point - obj.str2.point);
    shift = obj.str1.point * 2;
  } else if (obj.str1.point < obj.str2.point) {
    obj.str1.str += '0'.repeat(obj.str2.point - obj.str1.point);
    shift = obj.str2.point * 2;
  } else {
    shift = obj.str1.point * 2;
  }

  let buffer1 = '';
  let buffer2 = '';
  let digitalCharge = 0;

  for (let i = obj.str1.str.length - 1; i >= 0; i--) {

    let addDigit = 0;

    for (let j = obj.str2.str.length - 1; j >= 0; j--) {

      let temp = String(obj.str2.str[j] * obj.str1.str[i] + +addDigit);

      addDigit = 0;

      if (temp.length == 2) {

        j == 0 ?
          buffer1 += String(temp[1]) + String(temp[0]) :
          buffer1 += String(temp[1]);

        addDigit = temp[0];

      } else {
        buffer1 += String(temp);
      }
    }

    buffer1 = buffer1.split('').reverse().join('');

    if (i == obj.str1.str.length - 1) {
      buffer2 = buffer1;
    } else {
      buffer2 = bigSumm(buffer1 + '0'.repeat(digitalCharge), buffer2);
    }

    buffer1 = '';

    digitalCharge++

  }

  let zerosOnEnd = 0;

  for (let i = 0; i < shift; i++) {
    if (buffer2[buffer2.length - 1 - i] != '0') {
      break;
    }
    zerosOnEnd++;
  }

  if (zerosOnEnd == shift) {
    shift = 0;
    buffer2 = buffer2.slice(0, buffer2.length - zerosOnEnd)
  }

  let resultSign = '';
  if (obj.str1.sign * obj.str2.sign < 0) resultSign = '-';

  let additionalZeros = buffer2.length - shift < 0 ? '0'.repeat(shift - buffer2.length) : '';

  if (shift == 0) {
    return resultSign + buffer2
  } else {
    let zero = (buffer2.length - shift <= 0 ? '0' : '');
    let pointPosition = buffer2.length - shift < 0 ? 0 : buffer2.length - shift;
    let res = resultSign + zero + buffer2.slice(0, pointPosition) +
      '.' + additionalZeros + buffer2.slice(pointPosition);
    /*if (res[0] == '.') res = '0' + res;
    if (res[0] == '-'&&res[1]=='.') {
      res[0] = '0';
      res='-'+res;
    }

*/
    /*let pointPos=res.indexOf('.');
    if (pointPos>2&&res[0]=='-'){
      res=res[0]+res[1]+'.'+res.slice(2,res.indexOf('.'))+res.slice(res.indexOf('.'));
    } else if(pointPos>1&&res[0]!='-'){
      res=res[0]+'.'+res.slice(1,res.indexOf('.'))+res.slice(res.indexOf('.'));
    }*/
    return res;
  }
}

function bigDiff(str1, str2) {

  return str2[0] != '-' ?
    bigSumm(str1, '-' + str2) :
    bigSumm(str1, str2.slice(1));

}

function bigSumm(str1, str2) {

  let resultSign = '';
  let firstObj, secondObj;
  let obj = normalizeInput(str1, str2);
  let compareResult = compareWithoutSign(obj.str1, obj.str2);
  let integerResult;
  let floatResult;

  if (compareResult) {
    firstObj = obj.str1;
    secondObj = obj.str2;
  } else {
    firstObj = obj.str2;
    secondObj = obj.str1;
  }

  let firstInt = firstObj.str.slice(0, firstObj.str.length - firstObj.point)
  let firstFloat;

  firstObj.point ?
    firstFloat = firstObj.str.slice(firstObj.str.length - firstObj.point, firstObj.str.length) :
    firstFloat = '';

  let secondInt = secondObj.str.slice(0, secondObj.str.length - secondObj.point)
  let secondFloat;

  secondObj.point ?
    secondFloat = secondObj.str.slice(secondObj.str.length - secondObj.point, secondObj.str.length) :
    secondFloat = '';

  if ((firstFloat != '' && secondFloat != '') || firstFloat.length != secondFloat.length) {
    firstFloat.length > secondFloat.length ?
      secondFloat += '0'.repeat(firstFloat.length - secondFloat.length) :
      firstFloat += '0'.repeat(secondFloat.length - firstFloat.length);
  }

  if (obj.str1.sign * obj.str2.sign == 1) {

    integerResult = bigSimpleOperation(firstInt, secondInt, +1);
    floatResult = bigSimpleOperation(firstFloat, secondFloat, +1);

    if (floatResult.length > firstFloat.length && floatResult.length > secondFloat.length) {

      if (integerResult == '') integerResult = '0';

      integerResult = bigSimpleOperation(integerResult, '1', +1);
      floatResult = floatResult.slice(1, floatResult.length);
    }

    obj.str1.sign == 1 ?
      resultSign = '' :
      resultSign = '-';


  } else {
    integerResult = bigSimpleOperation(firstInt, secondInt, -1);
    floatResult = bigSimpleOperation(firstFloat, secondFloat, -1);
    if (floatResult.length > firstFloat.length && floatResult.length > secondFloat.length) {
      integerResult = bigSimpleOperation(integerResult, '1', -1);
      floatResult = floatResult.slice(1, floatResult.length);
    }
    //let delta = Math.max(firstFloat.length, secondFloat.length) - floatResult.length;
    //floatResult = '0'.repeat(delta) + floatResult;
    if (compareResult) {
      obj.str1.sign == 1 ?
        resultSign = '' :
        resultSign = '-';
    } else {
      obj.str1.sign != 1 ?
        resultSign = '' :
        resultSign = '-';
    }
  }

  /* if (+firstFloat[0] + +secondFloat[0] >= 10) {
     if (floatResult.length>1) floatResult=floatResult.slice(1);
     integerResult=bigSimpleOperation(integerResult,1, +1);
   }*/
  integerResult = leftZeroClear(integerResult);

  if (integerResult == '0' && floatResult == '') resultSign = '';


  // integerResult=checkZero(integerResult);
  if (integerResult == '') integerResult = '0';
  return floatResult == '' ?
    resultSign + integerResult :
    resultSign + integerResult + '.' + floatResult;
}

function normalizeInput(str1, str2) {
  let arr = [str1, str2]
  let resObj = {
    str1: {
      sign: 0,
      str: '',
      point: undefined,
    },
    str2: {
      sign: 0,
      str: '',
      point: undefined,
    },
    operation: '',
  }
  let name = '';
  for (item of arr) {
    let tempStr = [];
    name == '' ?
      name = 'str1' :
      name = 'str2';

    let itemArr = item.split('');
    let start = 0;

    if (typeof (item) != "string") return NaN;

    if (item.length == 0 || item == '+' || item == '-') {
      resObj[name].str = '0';
      continue;
    }

    resObj[name].sign = 1;

    if (itemArr[0] == '+' || itemArr[0] == '-') {

      if (itemArr[0] == '-') resObj[name].sign = -1;

      start = 1;
    }

    for (let i = start; i < itemArr.length; i++) {

      let currentSymbol = itemArr[i];

      if (isFinite(currentSymbol)) {
        tempStr.push(currentSymbol)
      } else if (currentSymbol == '.' && resObj[name].point == undefined) {
        resObj[name].point = item.length - 1 - i;

      } else {
        return NaN;
      }
    }

    while (tempStr[0] == '0') {
      tempStr.shift();
    }

    resObj[name].str = tempStr.join('');

  }

  if (resObj.str1.point == undefined) resObj.str1.point = 0;
  if (resObj.str2.point == undefined) resObj.str2.point = 0;

  if (resObj.str1.str == '') resObj.str1.str = '0';
  if (resObj.str2.str == '') resObj.str2.str = '0';

  return resObj

}

function compareWithoutSign(obj1, obj2) {
  let tempObj1 = {};
  let tempObj2 = {};

  Object.assign(tempObj1, obj1);
  Object.assign(tempObj2, obj2);
  tempObj1.sign = 1;
  tempObj2.sign = 1;
  return compare(tempObj1, tempObj2);
}

function leftZeroClear(str) {
  //let res = (''+str).split('')
  let res = [...str.toString()].map(Number);


  while (res[0] == '0' && res.length > 1) {
    res.shift();
  }
  return res.join('')
}

function compare(obj1, obj2) {

  if (obj1.sign > obj2.sign) return true;
  if (obj1.sign < obj2.sign) return false;

  if (obj1.str.length - obj1.point > obj2.str.length - obj2.point) {
    return obj1.sign > 0 ? true : false;
  }
  if (obj1.str.length - obj1.point < obj2.str.length - obj2.point) {
    return obj1.sign < 0 ? true : false;
  }

  answer = true;
  for (let i = 0; Math.max(obj1.str.length, obj2.str.length) - 1; i++) {
    if (i == obj1.str.length - 1 || i == obj2.str.length - 1) break;

    if (obj1.str[i] > obj2.str[i]) break;

    if (obj1.str[i] < obj2.str[i]) {
      answer = false;
      break;
    }

  }

  if (obj1.str.length == obj2.str.length) {
    answer = obj1.str > obj2.str ?
      true :
      false;
  }

  return obj1.sign > 0 ? answer : !answer;
}

function bigSimpleOperation(str1, str2, operation) {

  let res = [];
  let secondPosition = str2.length - 1;
  let addDigit = 0;

  for (let i = str1.length - 1; i >= 0; i--) {

    let secondValue

    if (secondPosition >= 0) {
      secondValue = +str2[secondPosition]
    } else if (secondPosition == -1) {
      secondValue = 0
    } else {
      if (addDigit == 0) {
        res.unshift(str1.slice(0, i + 1));
        addDigit = 0;
        break;
      } else {
        secondValue = 0;
      }
    }

    let temp = +str1[i] + secondValue * operation + addDigit * operation;

    if (temp > 9 || temp < 0) {
      temp -= 10 * operation;
      addDigit = 1;
    } else {
      addDigit = 0;
    }

    res.unshift(temp);

    secondPosition--
  }

  if (addDigit != 0) res.unshift(1);

  /*while (res[0] == 0 && res.length > 1) {
    res.shift();
  }*/

  // if (res[1]=='-'&&res[0]=='-') res.shift();

  return res.join('');

}
