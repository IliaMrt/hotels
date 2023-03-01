function correctSpaces(str) {
  let punkt = ['.', ',', ';', ':'];
  return str == '' ?
    '' :
    typeof (str) != 'string' ?
      undefined :
      (Array.from(str).reduce(
          (res, letter, index) => {
            return res += index == 0 && letter == ' ' ?
              '' :
              letter == ' ' && str[index - 1] == ' ' ?
                '' :
                punkt.includes(str[index + 1]) && letter == ' ' ?
                  '' :
                  punkt.includes(letter) && str[index + 1] != ' ' && str[index + 1] != null ?
                    letter + ' ' :
                    letter
          }, '')
      )
}

function firstBigRestLow(str) {
  return (str == '' || typeof (str) != 'string') ?
    undefined :
    str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function numberOfWords(str) {

  if (typeof (str) != 'string') return undefined;

  let count = 0;
  let flag = true;

  Array.from(str).forEach(letter => {
      if (letter == ' ' && flag == false) {
        flag = true
      } else if (letter != ' ' && flag == true) {
        count++;
        flag = false;
      }
    }
  );

  return count;

}

function numberOfUniqueWords(str) {

  if (typeof (str) != 'string') return undefined;

  let resMap = new Map();
  let temp = '';

  Array.from(str).map((letter, index) => {

      if (letter != ' ') temp += letter;

      if (temp.length != 0 && (letter == ' ' || index == str.length-1)) {
        resMap.has(temp) ?
          resMap.set(temp, resMap.get(temp) + 1) :
          resMap.set(temp, 1);
        temp='';
      }

    }
  )

  return resMap;
}

