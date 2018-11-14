const fs = require("fs");
const validator = require("../src/validation/validator");

test("HCA ref schema, species and restriction schema test WITHOUT errors", () => {
    let hcaSchema = fs.readFileSync("examples/schemas/draft-04/donor_organism.json");
    let jsonHcaSchema = JSON.parse(hcaSchema);

    let speciesSchema = fs.readFileSync("examples/schemas/draft-04/species_ontology.json");
    let jsonSpeciesSchema = JSON.parse(speciesSchema);

    let inputSchema = fs.readFileSync("examples/schemas/draft-04/biomaterial_core.json");
    let jsonCoreSchema = JSON.parse(inputSchema);

    let humanSchema = fs.readFileSync("examples/schemas/draft-04/human_specific.json")
    let jsonHumanSchema = JSON.parse(humanSchema)

    let ethnicitySchema = fs.readFileSync("examples/schemas/draft-04/ethnicity_ontology.json")
    let jsonEthnicitySchema = JSON.parse(ethnicitySchema)

    return validator.validateMultiSchema(
        [jsonHcaSchema, jsonSpeciesSchema, jsonCoreSchema, jsonHumanSchema, jsonEthnicitySchema],
        {

            describedBy: "https://schema.humancellatlas.org/type/biomaterial/8.1.0/donor_organism",
            biomaterial_core: {
                biomaterial_id: "abc",
                biomaterial_name: "hooman sample",
                ncbi_taxon_id: 9606
            },
            schema_type: "biomaterial",
            genus_species: {
                text: "hooooman",
                ontology: "NCBITaxon:9606",
                ontology_label: "Homo sapiens"
            },
            is_living: "yes",
            biological_sex: "female",
            human_specific: {
                ethnicity: {
                    text: "African",
                    ontology: "ancestro:0010"
                }
            }
        },
        jsonHcaSchema.id
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(0);
    });
});


// disease: {
//     text: "myocarditis",
//         ontology: "MONDO:0004496",
//         ontology_label: "myocarditis"
// },

// test("HCA ref schema, species and restriction schema test WITH errors", () => {
//     let hcaSchema = fs.readFileSync("examples/schemas/references/hca-ref-schema-graph.json");
//     let jsonHcaSchema = JSON.parse(hcaSchema);
//
//     let speciesSchema = fs.readFileSync("examples/schemas/references/hca-species-schema.json");
//     let jsonSpeciesSchema = JSON.parse(speciesSchema);
//
//     let inputSchema = fs.readFileSync("examples/schemas/references/graphRestriction-ref-schema.json");
//     let jsonRestrictionSchema = JSON.parse(inputSchema);
//
//     return protoValidate(
//         [jsonHcaSchema, jsonSpeciesSchema, jsonRestrictionSchema],
//         {
//             biomaterial_id: "abc",
//             biomaterial_name: "hooman sample",
//             ncbi_taxon_id: 9606,
//             genus_species: {
//                 ontology_label: "Homo sapiens"
//             },
//             disease: {
//                 text: "postnatal",
//                 ontology: "EFO:0002948",
//             },
//             is_living: "yes",
//             biological_sex: "female"
//         },
//         jsonHcaSchema.$id
//     ).then( (data) => {
//         expect(data).toBeDefined();
//         expect(data.length).toBe(2);
//         expect(data[0].dataPath).toBe(".genus_species.text");
//         expect(data[1].dataPath).toBe(".disease.ontology");
//     });
// });