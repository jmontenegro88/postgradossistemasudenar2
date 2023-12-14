const csv = require('csvtojson')

const dataFromCsv = (path, delimiter = '\t', encoding = 'utf8') => {
  return csv({ delimiter }, { encoding }).fromFile(path, { encoding })
}

module.exports = dataFromCsv
