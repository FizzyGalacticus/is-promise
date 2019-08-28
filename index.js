'use strict';

const {
    types: { isPromise },
} = require('util');

module.exports = val => {
    let promise = false;
    let uncertainty = false;

    if (isPromise(val)) {
        promise = true;
    } else if (val && val.then && typeof val.then === 'function' && val.catch && typeof val.catch === 'function') {
        promise = true;
        uncertainty = true;
    }

    return { promise, uncertainty };
};
