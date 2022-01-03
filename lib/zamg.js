'use strict';
const https = require('https');
const Papa = require('papaparse');

/**
 *
 */
class Zamg {
  url = 'https://www.zamg.ac.at/ogd/';

  /**
   *
   * @param {Object?} optOptions
   */
  constructor(optOptions = {}) {
    this.url = optOptions.url || this.url;
  }

  /**
   * Request current ZAMG data.
   *
   * @return {Promise<Object>}
   */
  async get() {
    return new Promise((resolve, reject) => {
      const req = https.get(this.url, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk.toString();
        });

        res.on('end', () => {
          resolve(body);
        });
      });

      req.on('error', (err) => {
        reject(err);
      });
    });
  }

  /**
   * Parse a given csv string into an array of objects.
   *
   * @param {String} csvString
   * @return {String}
   */
  parse(csvString) {
    const config = {
      header: true,
    };
    const result = Papa.parse(csvString.trim(), config);

    if (result.errors && result.errors.length) {
      const err = Error('encountered errors during parsing');
      err.errors = result.errors;

      throw err;
    }

    return result.data;
  }
}


module.exports = Zamg;
