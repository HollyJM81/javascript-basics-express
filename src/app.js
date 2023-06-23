const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');
const {
  add,
  subtract,
  multiply,
  divide,
  remainder,
} = require('./lib/numbers');

const {
  negate,
  truthiness,
  isOdd,
  startsWith
} = require('./lib/booleans');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2
} = require('./lib/arrays');

const app = express();
app.use(express.json());

// strings
app.get('/strings/hello/:string', (req, res) => {
  res.status(200).send({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).send({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).send({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  if (!req.query.length) {
    res.status(200).send({ result: firstCharacter(req.params.string) });
  }
  res.status(200).send({ result: firstCharacters(req.params.string, req.query.length) });
});

// numbers
app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: subtract(a, b) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;
  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }
  res.status(200).send({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;
  if (a === 0) {
    return res.status(200).send({ result: 0 });
  }
  if (b === 0) {
    return res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    return res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    return res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).send({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
    const { a, b } = req.body;
  if (a === 0) {
    return res.status(200).send({ result: 0 });
  }
  if (b === 0) {
    return res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    return res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) {
    return res.status(400).send({ error: 'Parameters must be valid numbers.' });
  }

  res.status(200).send({ result: remainder(a, b) });
});


// Booleans

app.post('/booleans/negate', (req, res) => {
res.status(200).send({ result: negate(req.body.value) })
});

app.post('/booleans/truthiness', (req, res) => {
  res.status(200).send({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const realNumber = Number(req.params.number);
  if (!realNumber) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.status(200).send({ result: isOdd(Number(req.params.number)) })
});

app.get('/booleans/:string/starts-with/:letter', (req, res) => {
  const char = req.params.letter;
  if (char.length > 1) {
    return res.status(400).send ({ error: 'Parameter "character" must be a single character.'})
  }
  res.status(200).send({ result: startsWith(req.params.letter, req.params.string) })
});


app.post('/arrays/element-at-index/:index', (req, res) => {
res.status(200).send({ result: getNthElement(req.params.index, req.body.array) });
});

app.post('/arrays/to-string', (req, res) => {
  res.status(200).send({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  res.status(200).send({ result: addToArray2(req.body.value, req.body.array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).send({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element/', (req, res) => {
    if (!req.query.index) {
      res.status(200).send({ result: removeNthElement2(0, req.body.array) });
    }
  res.status(200).send({ result: removeNthElement2(req.query.index, req.body.array) });
});


module.exports = app;
