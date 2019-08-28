# is-promise

Helps determine if a value is a Promise.

## Installation

`yarn add @fizzygalacticus/is-promise` || `npm i @fizzygalacticus/is-promise`

## Usage

`is-promise` returns an object with two values: `promise` and `uncertainty`. `promise` will be true if there is a great chance that the value being tested is a promise. `uncertainty` will be true if there is any uncertainty about whether or not the value is a promise.

```js
const isPromise = require('@fizzygalacticus/is-promise');

const Q = require('q');
const Bluebird = require('bluebird');
const RSVP = require('rsvp');
const FakePromise = require('promise');

const results = isPromise(new Promise(resolve => resolve())); // { promise: true, uncertainty: false }
const results = isPromise(new Q(resolve => resolve())); // { promise: true, uncertainty: true }
const results = isPromise(new Bluebird(resolve => resolve())); // { promise: true, uncertainty: true }
const results = isPromise(new FakePromise(resolve => resolve())); // { promise: true, uncertainty: true }
const results = isPromise(new RSVP.Promise(resolve => resolve())); // { promise: true, uncertainty: true }

## Notes

In order to be 100% certain that an object is a promise, you should stick to using native Node promises.
