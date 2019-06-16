module.exports = {
  spreadsheetUrl:
    'https://docs.google.com/spreadsheets/d/1O0QOUUq8N-NfHmlGWa61TN6oOSdQMBaDq0lp6DsCReQ/edit#gid=0',
  worksheets: [
    {
      id: 1,
      name: 'colors',
    },
    {
      id: 2,
      name: 'spacing',
    },
  ],
  formats: [
    {
      transform: 'web',
      format: 'scss',
    },
    {
      transform: 'web',
      format: 'common.js',
    },
    {
      transform: 'android',
      format: 'android.xml',
    },
    {
      transform: 'ios',
      format: 'ios.json',
    },
  ],
  outputDirectory: './tokens/',
};
