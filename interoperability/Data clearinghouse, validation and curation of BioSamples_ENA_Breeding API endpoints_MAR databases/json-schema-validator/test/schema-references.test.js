const fs = require("fs");
const validation = require("../src/validation/validator");

// test("Base schema and definitions schema test WITH erros", () => {
//     let baseSchema = fs.readFileSync("examples/schemas/references/base-sample-schema.json");
//     let jsonBaseSchema = JSON.parse(baseSchema);
//
//     let definitionsSchema = fs.readFileSync("examples/schemas/references/definitions-schema.json");
//     let jsonDefinitionsSchema = JSON.parse(definitionsSchema);
//
//     let errors = protoValidate(
//         [jsonBaseSchema, jsonDefinitionsSchema],
//         {
//             alias: "abc",
//             taxonId: 9606,
//             releaseDate: "2000-01-01",
//             sampleRelationships: [{
//                 accession: "def123",
//                 relationshipNature: ""
//             }]
//         },
//         jsonBaseSchema.$id
//     );
//
//     expect(errors).toBeDefined();
//     expect(errors[0].schemaPath).toBe("definitions-schema.json#/definitions/sampleRelationships/items/properties/relationshipNature/enum");
// });

test("Base schema and definitions schema test WITH erros", () => {
    let baseSchema = fs.readFileSync("examples/schemas/references/base-sample-schema.json");
    let jsonBaseSchema = JSON.parse(baseSchema);

    let definitionsSchema = fs.readFileSync("examples/schemas/references/definitions-schema.json");
    let jsonDefinitionsSchema = JSON.parse(definitionsSchema);

    return validation.validateMultiSchema(
        [jsonBaseSchema, jsonDefinitionsSchema],
        {
            alias: "abc",
            taxonId: 9606,
            releaseDate: "2000-01-01",
            sampleRelationships: [{
                accession: "def123",
                relationshipNature: ""
            }]
        },
        jsonBaseSchema.$id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(1);
        // expect(data[0].schemaPath).toBe("definitions-schema.json#/definitions/sampleRelationships/items/properties/relationshipNature/enum");
        expect(data[0].dataPath).toBe(".sampleRelationships[0].relationshipNature");
    });
});

test("Base schema and definitions schema test WITHOUT errors", () => {
    let baseSchema = fs.readFileSync("examples/schemas/references/base-sample-schema.json");
    let jsonBaseSchema = JSON.parse(baseSchema);

    let definitionsSchema = fs.readFileSync("examples/schemas/references/definitions-schema.json");
    let jsonDefinitionsSchema = JSON.parse(definitionsSchema);

    return validation.validateMultiSchema(
        [jsonBaseSchema, jsonDefinitionsSchema],
        {
            alias: "abc",
            taxonId: 9606,
            releaseDate: "2000-01-01",
            sampleRelationships: [{
                accession: "def123",
                relationshipNature: "derived from"
            }]
        },
        jsonBaseSchema.$id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(0);
    });
});

test("ML schema -> base schema -> definitions schema test", () => {
    let mlSchema = fs.readFileSync("examples/schemas/references/ml-sample-schema.json");
    let jsonMLSchema = JSON.parse(mlSchema);

    let baseSchema = fs.readFileSync("examples/schemas/references/base-sample-schema.json");
    let jsonBaseSchema = JSON.parse(baseSchema);

    let definitionsSchema = fs.readFileSync("examples/schemas/references/definitions-schema.json");
    let jsonDefinitionsSchema = JSON.parse(definitionsSchema);

    return validation.validateMultiSchema(
        [jsonMLSchema, jsonBaseSchema, jsonDefinitionsSchema],
        {
            alias: "abc",
            taxonId: 9606,
            releaseDate: "2000-01-01",
            attributes: {
                Organism: [{value: "Homo sapiens"}],
                "Organism part": [{}]
            }
        },
        jsonMLSchema.$id
    ).then( (data) => {
        expect(data[0].dataPath).toBe(".attributes['Organism part'][0].value");
    });
});

test("HCA ref schema and species schema test WITHOUT errors", () => {
    let hcaSchema = fs.readFileSync("examples/schemas/references/hca-ref-schema.json");
    let jsonHcaSchema = JSON.parse(hcaSchema);

    let speciesSchema = fs.readFileSync("examples/schemas/references/hca-species-schema.json");
    let jsonSpeciesSchema = JSON.parse(speciesSchema);

    return validation.validateMultiSchema(
        [jsonHcaSchema, jsonSpeciesSchema],
        {
            biomaterial_id: "abc",
            biomaterial_name: "hooman sample",
            ncbi_taxon_id: 9606,
            genus_species: {
                text: "hooooman",
                ontology_label: "Homo sapiens"
            },
            is_living: "yes",
            biological_sex: "female"
        },
        jsonHcaSchema.$id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(0);
    });
});

test("HCA ref schema, species and restriction schema test WITHOUT errors", () => {
    let hcaSchema = fs.readFileSync("examples/schemas/references/hca-ref-schema-graph.json");
    let jsonHcaSchema = JSON.parse(hcaSchema);

    let speciesSchema = fs.readFileSync("examples/schemas/references/hca-species-schema.json");
    let jsonSpeciesSchema = JSON.parse(speciesSchema);

    let inputSchema = fs.readFileSync("examples/schemas/references/graphRestriction-ref-schema.json");
    let jsonRestrictionSchema = JSON.parse(inputSchema);

    return validation.validateMultiSchema(
        [jsonHcaSchema, jsonSpeciesSchema, jsonRestrictionSchema],
        {
            biomaterial_id: "abc",
            biomaterial_name: "hooman sample",
            ncbi_taxon_id: 9606,
            genus_species: {
                text: "hooooman",
                ontology_label: "Homo sapiens"
            },
            disease: {
                text: "myocarditis",
                ontology: "MONDO:0004496",
                ontology_label: "myocarditis"
            },
            is_living: "yes",
            biological_sex: "female"
        },
        jsonHcaSchema.$id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(0);
    });
});

test("HCA ref schema, species and restriction schema test WITH errors", () => {
    let hcaSchema = fs.readFileSync("examples/schemas/references/hca-ref-schema-graph.json");
    let jsonHcaSchema = JSON.parse(hcaSchema);

    let speciesSchema = fs.readFileSync("examples/schemas/references/hca-species-schema.json");
    let jsonSpeciesSchema = JSON.parse(speciesSchema);

    let inputSchema = fs.readFileSync("examples/schemas/references/graphRestriction-ref-schema.json");
    let jsonRestrictionSchema = JSON.parse(inputSchema);

    return validation.validateMultiSchema(
        [jsonHcaSchema, jsonSpeciesSchema, jsonRestrictionSchema],
        {
            biomaterial_id: "abc",
            biomaterial_name: "hooman sample",
            ncbi_taxon_id: 9606,
            genus_species: {
                ontology_label: "Homo sapiens"
            },
            disease: {
                text: "postnatal",
                ontology: "EFO:0002948",
            },
            is_living: "yes",
            biological_sex: "female"
        },
        jsonHcaSchema.$id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(2);
        expect(data[0].dataPath).toBe(".genus_species.text");
        expect(data[1].dataPath).toBe(".disease.ontology");
    });
});

