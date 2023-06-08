const getNthElement = (index, array) => array[index % array.length];

const arrayToCSVString = array => array.toString();

const csvStringToArray = string => string.split(',');

const addToArray = (element, array) => {
  array.push(element);
};

const addToArray2 = (element, array) => array.concat(element);

const removeNthElement = (index, array) => array.splice(index, 1);

const numbersToStrings = numbers => {
  return numbers.map(element => element.toString());
};

const uppercaseWordsInArray = strings => {
  return strings.map(letter => letter.toUpperCase());
};

const reverseWordsInArray = strings => {
  return strings.map(word =>
    word
      .split('')
      .reverse()
      .join('')
  );
};

const onlyEven = numbers => {
  return numbers.filter(number => number % 2 === 0);
};

const removeNthElement2 = (index, array) => {
  let newArray;
  newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
};

const elementsStartingWithAVowel = strings => {
  return strings.filter(
    string =>
      string.toLowerCase().startsWith('a') ||
      string.toLowerCase().startsWith('e') ||
      string.toLowerCase().startsWith('i') ||
      string.toLowerCase().startsWith('o') ||
      string.toLowerCase().startsWith('u')
  );
};

const removeSpaces = string => string.split(' ').join('');

const sumNumbers = numbers => {
  const result = numbers.reduce((a, b) => {
    return a + b;
  }, 0);
  return result;
};

const sortByLastLetter = strings => {
  return strings.sort(
    (a, b) => a.charCodeAt(a.length - 1) - b.charCodeAt(b.length - 1)
  );
};

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter
};
