'use strict';
const {Zamg} = require('../');
const {access, readFile, writeFile} = require('fs/promises');


(async () => {
  const zamg = new Zamg();
  let storeData = true;
  let exists = false;

  console.log('Request current ZAMG measurements.');
  let storecsv = await zamg.get();

  const parsed = zamg.parse(storecsv);
  const date = zamg.getDate(parsed[0].Datum, parsed[0].Zeit);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}`;
  const fileName = `data/${dateString}.csv`;

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
    console.log(`Write data for ${dateString} ${timeString}`);
  }
})();
