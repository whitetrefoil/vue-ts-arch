'use strict'

const fs             = require('fs-extra')
const forEach        = require('lodash/forEach')
const { Observable } = require('rxjs')

/**
 * @typedef IJsonStubapi
 * @param {number} [code]
 * @param {Object} [headers]
 * @param {Object | Object[] | string} body
 */

/**
 * @param {string} jsonPath
 * @returns {Observable<IJsonStubapi>}
 */
const readFromJson = function readFromJson(jsonPath) {
  return Observable.bindNodeCallback(fs.readJson)(jsonPath)
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
const readFromJsonThenResponse = function readFromJsonThenResponse(jsonPath, req, res, next) {
  readFromJson(jsonPath)
    .subscribe((json) => {
      res.statusCode = json.code || 200
      forEach(json.headers, (v, k) => {
        res.setHeader(k, v)
      })
      res.end(JSON.stringify(json.body, null, 2))
    }, (err) => {
      if (err.code === 'ENOENT') {
        res.statusCode = 404
        res.end(JSON.stringify({
          errorCode: '404',
          errorMessage: `StubAPI JSON file not found: ${jsonPath}`,
        }))
      }
    })
}
module.exports.readFromJsonThenResponse = readFromJsonThenResponse
