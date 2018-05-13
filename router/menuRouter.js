module.exports = {
  menu: (app, db) => {
    app.get('/get-menu', (req, res) => {
      db.select(`select * from class`, (data) => res.send(data))
    })
  }
}