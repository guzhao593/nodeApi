let { insertDataToDatabase, updateDataToDatabase } = require('./../utils')
module.exports = {
  menu: (app, db) => {
    app.get('/get-menu', (req, res) => {
      db.select(`select * from class`, (data) => res.send(data))
    })
    app.post('/add-menu', (req, res) => {
      let insField = ['className', 'orderNumber', 'parentId', 'selfId', 'route', 'redirect']
      db.select(insertDataToDatabase(insField, req.body, 'class'), (data) => res.send(data))
    })
    app.delete('/delete-menu', (req, res) => {
      let sql = `delete from class where selfId in (${req.query.allselfId.join(', ')})`
      db.select(sql, (data) => res.send(data))
    })
    app.put('/update-menu', (req, res) => {
      let updateFieldArray = ['className', 'orderNumber', 'parentId', 'selfId', 'route', 'redirect']
      db.select(updateDataToDatabase(updateFieldArray, req.body, 'class', 'id'), data => res.send(data))
    })
  }
}