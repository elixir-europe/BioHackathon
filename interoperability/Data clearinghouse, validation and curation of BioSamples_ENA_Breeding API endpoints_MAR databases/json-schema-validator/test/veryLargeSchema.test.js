const fs = require("fs");
const validation = require("../src/validation/validator");

test("HCA ref schema, species and restriction schema test very large schema no errors", () => {
    let hcaSchemas = fs.readFileSync("examples/schemas/references/very-large-schema.json");
    let jsonHcaSchemas = JSON.parse(hcaSchemas);

    let schemas = jsonHcaSchemas.schemas;

    let rootSchemaId = "http://schema.dev.data.humancellatlas.org/type/biomaterial/8.2.7/donor_organism"

    return validation.validateMultiSchema(
        schemas,
        {
            "describedBy": "https://schema.dev.data.humancellatlas.org/type/biomaterial/8.2.7/donor_organism",
            "schema_type": "biomaterial",
            "biomaterial_core": {
                "biomaterial_id": "d1",
                "biomaterial_name": "donor1",
                "ncbi_taxon_id": [
                    9606
                ]
            },
            "is_living": "yes",
            "biological_sex": "male",
            "development_stage": {
                "text": "adult",
                "ontology": "EFO:0001272"
            },
            "genus_species": [
                {
                    "text": "Homo sapiens",
                    "ontology": "NCBITAXON:9606"
                }
            ]        },
        rootSchemaId
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(0);
    });
});


test("HCA ref schema, species and restriction schema test very large schema with errors", () => {
    let hcaSchemas = fs.readFileSync("examples/schemas/references/very-large-schema.json");
    let jsonHcaSchemas = JSON.parse(hcaSchemas);

    let schemas = jsonHcaSchemas.schemas;

    let rootSchemaId = "http://schema.dev.data.humancellatlas.org/type/biomaterial/8.2.7/donor_organism"

    return validation.validateMultiSchema(
        schemas,
        {
            "describedBy": "https://schema.dev.data.humancellatlas.org/type/biomaterial/8.2.7/donor_organism",
            "schema_type": "biomaterial",
            "biomaterial_core": {
                "biomaterial_id": "d1",
                "biomaterial_name": "donor1",
                "ncbi_taxon_id": [
                    9606
                ]
            },
            "biological_sex": "dude",
            "development_stage": {
                "text": "adult",
                "ontology": "EFO:0001272"
            },
            "genus_species": [
                {
                    "text": "Homo sapiens",
                    "ontology": "MONDO:0005161"
                }
            ]        },
        rootSchemaId
    ).then( (data) => {
        expect(data).toBeDefined();
        expect(data.length).toBe(3);
        expect(data[0].errors).toContain("Provided term is not child of [http://purl.obolibrary.org/obo/OBI_0100026,http://purl.obolibrary.org/obo/NCBITaxon_2759]")
        expect(data[1].errors).toContain("should have required property 'is_living'")
        expect(data[2].errors).toContain("should be equal to one of the allowed values: [\"female\",\"male\",\"mixed\",\"unknown\"]")
    });
});


