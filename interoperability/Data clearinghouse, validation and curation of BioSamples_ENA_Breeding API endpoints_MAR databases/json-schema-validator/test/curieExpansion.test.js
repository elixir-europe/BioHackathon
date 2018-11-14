const curieExpansion = require("../src/utils/curie_expansion");

test("Curie expansion with no errors", () => {
    const curie = "EFO:0000399"

    const isCurie = curieExpansion.isCurie(curie);

    expect(isCurie).toBe(true);

    // const uri = curieExpansion.expandCurie(curie)

    // expect(uri).toBe("http://www.ebi.ac.uk/efo/EFO_0000399");

    return curieExpansion.expandCurie(curie).then( (uri) => {
        expect(uri).toBe("http://www.ebi.ac.uk/efo/EFO_0000399");
    });


});