"use strict";
let Ajv = require('ajv');

class OptsChecker{
    constructor(schema, func){
        this.func = func;
        this.schema = schema;
    }
    validateOptsObject(opts){
        let ajv = new Ajv({allErrors: true});
        let validate = ajv.compile(this.schema);
        let valid = validate(opts);
        if(!valid) return validate.errors;
        return this.run(opts)
    }

    run(opts){
        return this.func(opts)
    }
}

module.exports = OptsChecker;