let mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'mycommonweb'
})

module.exports = {
  select (sql, cb) {
    pool.query(sql, (error, data) => cb(data))
  }
}