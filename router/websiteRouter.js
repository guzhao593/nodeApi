let  { insertDataToDatabase, updateDataToDatabase } = require('./../utils') 
module.exports = {
  website: (app, db) => {
    app.get('/get-website', (req, res) => {
      db.select(`select * from web where class = '${req.query.class}'`, (data) => res.send(data))
    })
    app.delete('/delete-website', (req, res) => {
      db.select(`delete from web where id = '${req.query.id}'`, (data) => res.send(data))
    })
    app.post('/add-website', (req, res) => {
      let insFieldArray = ['url', 'name', 'class']
      db.select(insertDataToDatabase(insFieldArray, req.query, 'web'), (data) => res.send(data))
    })
    app.put('/update-website', (req, res) => {
      let updateFieldArray = ['url', 'name', 'class']
      console.log(updateDataToDatabase(updateFieldArray, req.query, 'web', 'id'))
      db.select(updateDataToDatabase(updateFieldArray, req.query, 'web', 'id'), data => res.send(data))
    })
  }
}