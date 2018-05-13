module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      db.select(`select * from web where class = '${req.query.class}'`, (data) => res.send(data))
    })
    app.delete('/delete-website', (req, res) => {
      db.select(`delete from web where id = '${req.query.id}'`, (data) => res.send(data))
    })
  }
}