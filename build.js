const fs = require('fs');
const theo = require('theo');
const {config} = require('./package.json');
const imporTokensFromGoogleSpreadSheets = require('./import-tokens-from-google-spreadsheets');

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
    const data = await imporTokensFromGoogleSpreadSheets(config.key, id);

    for ({transform, format} of config.formats) {
      const tokens = await convert(
        name,
        transform,
        format,
        JSON.stringify(data),
      );
      fs.writeFileSync(`./tokens/${name}.${format}`, tokens);
    }
  }
};

main(config);
