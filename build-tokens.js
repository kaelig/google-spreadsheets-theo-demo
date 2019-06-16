const fs = require('fs');
const path = require('path');
const theo = require('theo');
const googleSpreadsheetsTheo = require('google-spreadsheets-theo');

const config = require('./config');

const convert = (name, transform, format, data) =>
  theo
    .convert({
      transform: {
        type: transform,
        file: `${name}.json`,
        data,
      },
      format: {
        type: format,
      },
    })
    .then((contents) => contents)
    .catch((error) => console.log(`Something went wrong: ${error}`));

const main = async (config) => {
  for ({id, name} of config.worksheets) {
    const data = await googleSpreadsheetsTheo(config.spreadsheetUrl, id);

    for ({transform, format} of config.formats) {
      const tokens = await convert(name, transform, format, data);
      const filename = `${config.outputDirectory}${name}.${format}`;
      await fs.promises
        .mkdir(path.dirname(filename), {recursive: true})
        .then(() => {
          fs.writeFileSync(filename, tokens);
        });
      console.log(`✔ Design tokens written to ${filename}`);
    }
  }
};

main(config);
