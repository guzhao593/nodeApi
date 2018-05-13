let { insertDataToDatabase } = require('./../utils')
module.exports = {
  menu: (app, db) => {
    app.get('/get-menu', (req, res) => {
      db.select(`select * from class`, (data) => res.send(data))
    })
    app.post('/add-menu', (req, res) => {
      let insField = ['className', 'orderNumber', 'parentId', 'selfId', 'route', 'redirect']
      db.select(insertDataToDatabase(insField, req.query), (data) => res.send(data))
    })
    app.delete('/delete-menu', (req, res) => {
      let sql = `delete from class where selfId in (${req.query.allselfId.join(', ')})`
      db.select(sql, (data) => res.send(data))
    })
  }
}