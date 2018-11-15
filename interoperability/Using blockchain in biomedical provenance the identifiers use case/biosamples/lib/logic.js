/**
 * Curate a Biosample changing the value of an existing characteristic or adding a new one
 * @param {org.biosamples.curation} curationTx
 * @transaction
 */
async function curation(curationTx) {
  let sample = curationTx.precuration;
  let curationcount = sample.nocuration
  let oldCharacteristics = sample.char;
  let newCharacteristics = curationTx.postcuration;
  let event = getFactory().newEvent("org.biosamples", "curation_event");
  if (oldCharacteristics === undefined) {
    event.precuration = [];
    sample.char = newCharacteristics;
  } else {
    event.precuration = deepCopy(oldCharacteristics);
    newCharacteristics.forEach(newCharacteristic => {
      let exist = false;
      oldCharacteristics.forEach(oldCharacteristic => {
        if (newCharacteristic.name === oldCharacteristic.name) {
          oldCharacteristic.ontologyTerms = newCharacteristic.ontologyTerms;
          exist = true;
        }
      });
      if (!exist) {
        sample.char.push(newCharacteristic);
      }
    });
  }
  sample.nocuration = curationcount +1;	
  const sampleRegistry = await getAssetRegistry("org.biosamples.sample");
  await sampleRegistry.update(sample);
  event.postcuration = sample.char;
  console.log(event);
  emit(event);
}

function deepCopy(arr) {
  var out = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    var obj = getFactory().newConcept("org.biosamples", "characteristics");
    for (var k in item) {
      obj[k] = item[k];
    }
    out.push(obj);
  }
  return out;
}