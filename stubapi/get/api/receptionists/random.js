const Random = require('mockjs').Random

module.exports = (req, res) => {
  res.statusCode = 200
  res.end(JSON.stringify({
    _code: 200,
    _message: 'OK',
    _data: {
      name: Random.name(),
    },
  }, null, 2))
}
