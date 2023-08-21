const assert = require('assert')
const mocha = require('mocha')
const PersonChar = require('../models/personchar')
//  Mieu ta qua trinh test\
describe('Mieu ta them du lieu', function () {
    it('Them 1 ban ghi vao CSDL', function (done) {
        var char = new PersonChar({
            name: "hang",
        })
        char.save().then(function () {
            assert(char.isNew === false);
            done();
        })
    })

})