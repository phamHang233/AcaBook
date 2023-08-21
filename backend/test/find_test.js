const assert = require('assert')
const mocha = require('mocha')
const PersonChar = require('../models/personchar')
//  Mieu ta qua trinh test\
describe('Tim kiem ban ghi', function () {

    //tim kiem 1 ban ghi
    it('Tim kiem  1 ban ghi tu CSDL', function (done) {
        PersonChar.findOne({ name: 'hang' }).then(function (res) {
            assert(res.name === 'hang');
            done();
        })
    })

    //tim kiem 1 ban ghi bang 
    it('Tim kiem  1 ban ghi bang ID tu CSDL', function (done) {
        PersonChar.findOne({ _id: char })
    })

})