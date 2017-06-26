const Random = require('mockjs').Random

module.exports = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    code: 200,
    message: 'OK',
    data: {
      name: Random.name(),
    },
  }, null, 2))
}
