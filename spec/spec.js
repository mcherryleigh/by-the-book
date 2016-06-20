"use strict";
let OptsChecker = require('../OptsChecker.js');
let schema = {
    "properties": {
        "smaller": {
            type: 'number',
            maximum: 3
        },
        "larger": { type: 'number' }
    }
};
//if the schema passes true will return otherwise an object with error messages will
let OC = new OptsChecker(schema, //schema obj
    function(){ //return a true if it passes
        return true;
    }, function(err){ //return the error if it fails
        return err;
    }
);
describe("An OptsChecker", function() {

    it("returns true when opts obj is valid for schema", function() {
        let validData = {
            smaller: 1,
            larger: 3
        };
        expect(OC.validateOptsObject(validData)).toBe(true);
    });

    it("returns reasons when opts obj is invalid for schema", function() {
        let invalidData = {
            smaller: 100,
            larger: 'x'
        };
        expect(OC.validateOptsObject(invalidData)).toEqual([
            {
                keyword: 'maximum',
                dataPath: '.smaller',
                schemaPath: '#/properties/smaller/maximum',
                params: {
                    comparison: '<=',
                    limit: 3,
                    exclusive: false
                },
                message: 'should be <= 3'
            },{
                keyword: 'type',
                dataPath: '.larger',
                schemaPath: '#/properties/larger/type',
                params: {
                    type: 'number'
                },
                message: 'should be number'
            }
        ]);
    });

});