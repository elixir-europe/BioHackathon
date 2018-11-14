const fs = require("fs");
const runValidation = require("../src/validation/validator");

test("isValidTerm", () => {
  let inputSchema = fs.readFileSync("examples/schemas/isValidTerm-schema.json");
  let jsonSchema = JSON.parse(inputSchema);

  let inputObj = fs.readFileSync("examples/objects/isValidTerm.json");
  let jsonObj = JSON.parse(inputObj);

  return runValidation.validateSingleSchema(jsonSchema, jsonObj).then( (data) => {
    expect(data).toBeDefined();
    expect(data[0]).toBeDefined();
  });
});