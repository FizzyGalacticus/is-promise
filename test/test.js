'use strict';

const assert = require('assert');

const isPromise = require('../');

const constructLib = libName => () => {
    const constructor = require(libName);

    return new constructor(resolve => resolve());
};

const createTest = (libName, instantiate = () => {}, expectedPromise, expectedUncertainty) =>
    describe(libName, () => {
        const instance = instantiate();

        it(`${expectedPromise ? 'is' : `isn't`} a promise`, () => {
            const { promise } = isPromise(instance);

            assert.equal(promise, expectedPromise);
        });

        it(`${expectedUncertainty ? 'has' : `doesn't have`} uncertainty`, () => {
            const { uncertainty } = isPromise(instance);

            assert.equal(uncertainty, expectedUncertainty);
        });
    });

describe('is-promise', () => {
    createTest('native', () => new Promise(resolve => resolve()), true, false);

    // Standard third parties
    ['bluebird', 'q', 'promise'].forEach(thirdPartyLib =>
        createTest(thirdPartyLib, constructLib(thirdPartyLib), true, true)
    );

    // Special snowflakes
    ['rsvp'].forEach(thirdPartyLib =>
        createTest(
            thirdPartyLib,
            () => {
                const rsvp = require('rsvp');
                return new rsvp.Promise(resolve => resolve());
            },
            true,
            true
        )
    );
});
