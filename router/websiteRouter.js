module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      db.select(`select * from web where class = '${req.query.class}'`, (data) => res.send(data))
    })
  }
}