let { insertDataToDatabase } = require('./../utils')
module.exports = {
  menu: (app, db) => {
    app.get('/get-menu', (req, res) => {
      db.select(`select * from class`, (data) => res.send(data))
    })
    app.post('/add-menu', (req, res) => {
      let insField = ['className', 'orderNumber', 'parentId', 'selfId', 'route', 'redirect']
      let sql =  insertDataToDatabase(insField, req.query)
      console.log(sql)
      db.select(sql, (data) => res.send(data))
    })
  }
}