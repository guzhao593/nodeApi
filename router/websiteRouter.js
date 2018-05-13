module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      db.select(`select * from web`, (data) => res.send(data))
    })
  }
}