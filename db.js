let mysql = require('mysql')

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'mycommonweb',
  multipleStatements: true  // 启用执行多条语句 
})

module.exports = {
  select (sql, cb) {
    pool.query(sql, (error, data) => {
      cb(data)
    })
  }
}