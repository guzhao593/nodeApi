let  { insertDataToDatabase, updateDataToDatabase } = require('./../utils') 
module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      let sql
      if (!req.query.class) {
        sql = 'select * from web'
      } else {
        sql = `select * from web where class = '${req.query.class}'`
      }
      db.select(sql, (data) => {
        res.send(data)
      })
    })
    app.post('/update-website-orderNO', (req, res) => {
      let sql = [], key = 0
      req.body.webData.forEach((item)=> {
        if(item !== null) {
          sql.push(`update web set orderNo = '${key}' where id = '${item.id}'; `)
          key++
        }
      })
      db.select(sql.join(''), data => res.send(data))
    })
    app.delete('/delete-website', (req, res) => {
      db.select(`delete from web where id = '${req.query.id}'`, (data) => res.send(data))
    })
    app.post('/add-website', (req, res) => {
      let insFieldArray = ['url', 'name', 'class', 'orderNo']
      db.select(insertDataToDatabase(insFieldArray, req.body, 'web'), (data) => res.send(data))
    })
    app.put('/update-website', (req, res) => {
      let updateFieldArray = ['url', 'name', 'class']
      db.select(updateDataToDatabase(updateFieldArray, req.body, 'web', 'id'), data => res.send(data))
    })
  }
}