const fs = require("fs");
const runValidation = require("../src/validation/validator");

test(" -> graphRestriction Schema", () => {
    let inputSchema = fs.readFileSync("examples/schemas/graphRestriction-schema.json");
    let jsonSchema = JSON.parse(inputSchema);

    let inputObj = fs.readFileSync("examples/objects/graphRestriction_pass.json");
    let jsonObj = JSON.parse(inputObj);

    return runValidation.validateSingleSchema(jsonSchema, jsonObj).then( (data) => {
        expect(data).toBeDefined();
    });
});

test(" -> graphRestriction Schema", () => {
    let inputSchema = fs.readFileSync("examples/schemas/graphRestriction-schema.json");
    let jsonSchema = JSON.parse(inputSchema);

    let inputObj = fs.readFileSync("examples/objects/graphRestriction_normal.json");
    let jsonObj = JSON.parse(inputObj);

    return runValidation.validateSingleSchema(jsonSchema, jsonObj).then( (data) => {
        expect(data).toBeDefined();
    });
});

test(" -> graphRestriction Schema", () => {
    let inputSchema = fs.readFileSync("examples/schemas/graphRestriction-schema.json");
    let jsonSchema = JSON.parse(inputSchema);

    let inputObj = fs.readFileSync("examples/objects/graphRestriction_fail.json");
    let jsonObj = JSON.parse(inputObj);

    return runValidation.validateSingleSchema(jsonSchema, jsonObj).then( (data) => {
        expect(data).toBeDefined();
        expect(data[0]).toBeDefined();
    });
});
