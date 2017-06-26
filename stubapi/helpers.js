const fs             = require('fs-extra')
const forEach        = require('lodash/forEach')

/**
 * @typedef IJsonStubapi
 * @param {number} [code]
 * @param {Object} [headers]
 * @param {Object | Object[] | string} body
 */

/**
 * @param {string} jsonPath
 * @returns {Promise<IJsonStubapi>}
 */
const readFromJson = async function readFromJson(jsonPath) {
  return new Promise((resolve, reject) => {
    fs.readJson(jsonPath, (err, res) => {
      if (err != null) { reject(err) }
      resolve(res)
    })
  })
}
module.exports.readFromJson = readFromJson

/**
 * @param {string} jsonPath
 * @param {NodeJS.IncomingMessage} req
 * @param {NodeJS.ServerResponse} res
 * @param {Function} [next]
 * @returns {undefined}
 */
// eslint-disable-next-line no-unused-vars
const readFromJsonThenResponse = async function readFromJsonThenResponse(jsonPath, req, res, next) {
  try {
    const json = await readFromJson(jsonPath)
    res.statusCode = json.code || 200
    forEach(json.headers, (v, k) => {
      res.setHeader(k, v)
    })
    res.end(JSON.stringify(json.body, null, 2))
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.statusCode = 404
      res.end(JSON.stringify({
        errorCode: '404',
        errorMessage: `StubAPI JSON file not found: ${jsonPath}`,
      }))
    }
  }
}
module.exports.readFromJsonThenResponse = readFromJsonThenResponse
