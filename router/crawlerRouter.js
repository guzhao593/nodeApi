const crawler = require('./../crawler/http')
module.exports = {
  crawler: (app, db) => {
    app.get('/get-news', (req, res) => {
      crawler((data) => res.send(data))
    })
  }
}