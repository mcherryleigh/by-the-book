"use strict";
let Ajv = require('ajv');

class OptsChecker{
    constructor(schema, validFunc, invalidFunc){
        this.validFunc = validFunc;
        this.invalidFunc = invalidFunc;
        this.schema = schema;
    }
    validateOptsObject(opts){
        let ajv = new Ajv({allErrors: true});
        let validate = ajv.compile(this.schema);
        let valid = validate(opts);
        if(!valid) return this.invalidFunc(validate.errors); //if validate() doesn't pass run the invalid-Function
        return this.run(opts) //if valid, run the valid-Function with the original opts arguments intended for it
    }

    run(opts){
        return this.validFunc(opts)
    }
}

module.exports = OptsChecker;