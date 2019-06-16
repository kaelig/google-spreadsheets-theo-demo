const fetch = require('node-fetch');

const fetchSpreadsheet = async (key, worksheet) => {
  const res = await fetch(
    `https://spreadsheets.google.com/feeds/list/${key}/${worksheet}/public/values?alt=json`,
  );
  const data = await res.json();
  return data;
};

const mapTokensToTheo = (json) => ({
  props: json.feed.entry.map((token) => ({
    name: token.gsx$name.$t,
    value: token.gsx$value.$t,
    category: token.gsx$category.$t,
    type: token.gsx$type.$t,
    comment: token.gsx$comment.$t === '' ? undefined : token.gsx$comment.$t,
  })),
});

module.exports = (key, worksheet) =>
  fetchSpreadsheet(key, worksheet)
    .then(mapTokensToTheo)
    .catch((err) => console.error(err));
