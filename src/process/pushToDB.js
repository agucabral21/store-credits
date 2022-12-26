//pushToSqs.js
const stream = require('stream');

class PushToDB extends stream.Transform {
  constructor(options = {}) {
    //super({ ...options, objectMode: true })
    super();
  }

  async _transform(chunk, encoding, done) {
    try {
      let csvRow = this.parseCsvRow(chunk.toString());
      //await this.processChunk(csvRow);
    } catch (error) {
      done(error);
    }
  }

  parseCsvRow(csvRow) {
    console.log('=');
    console.log(csvRow);
    console.log('-');
  }
}

module.exports = { PushToDB };
