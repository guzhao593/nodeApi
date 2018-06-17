let  { insertDataToDatabase, updateDataToDatabase } = require('./../utils') 
module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      let sql = 'select * from web '
      req.query.class && (sql += `where class = '${req.query.class}'`)
      req.query.pageSize && (sql += `limit ${(req.query.pageIndex - 1) * req.query.pageSize}, ${req.query.pageSize}; select count(*) as sum from web`)
      if(+req.query.pageSize === -1) {sql = 'select * from web; select count(*) as sum from web'}
      db.select(sql, (data) => {
        let resObj = null
        req.query.pageSize && (resObj = {
          data: data[0],
          info: {
            total: data[1][0].sum,
            pageIndex: req.query.pageIndex,
            pageSize: req.query.pageSize
          }
        })
        res.send(resObj || data)
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