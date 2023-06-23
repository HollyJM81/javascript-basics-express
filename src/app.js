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
  power,
  round,
  roundUp,
  roundDown,
  absolute,
  quotient,
  remainder,
} = require('./lib/numbers');

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
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).send({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
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

module.exports = app;
