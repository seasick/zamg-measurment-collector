'use strict';
const {Zamg} = require('../');
const {access, readFile, writeFile} = require('fs/promises');


(async () => {
  const zamg = new Zamg();

  console.log('Request current ZAMG measurements.');

  const result = await zamg.get();
  let storeData = true;
  let storecsv = result.responseBody;

  // TODO Extract date from result

  const fileName = `data/${result.parsed[0].Datum}.csv`;
  let exists = false;

  try {
    await access(fileName);
    exists = true;
  } catch (err) {
    // Do nothing except log that the file is not existing.
    console.log(`${fileName} is not existing.`);
  }

  // If the file already exists, we want to remove the first line.
  if (exists) {
    storecsv = storecsv.split('\n');
    storecsv.shift();
    storecsv = storecsv.join('\n');

    // Check if the data is already existing in the target file
    const current = await readFile(fileName);

    if (current.toString().indexOf(storecsv) !== -1) {
      storeData = false;
      console.log('Data is already existing, no need to store');
    }
  }

  if (storeData) {
    await writeFile(fileName, storecsv, {flag: 'a'});
  }
})();
