/**
 * Created by rolando on 14/08/2018.
 */

const IngestValidator = require('../../src/validation/ingest-validator');

test("file format from file name", () => {
    const ingestValidator = new IngestValidator(null, null, null);

    let fileName = "aaaa.fastq.gz";
    let format = ingestValidator.fileFormatFromFileName(fileName);
    expect(format).toBe("fastq.gz");
});
