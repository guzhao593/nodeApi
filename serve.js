let express = require('express')

let router = require('./router')

let app = express()

router(app)

app.listen(8585, () => {
  console.log('当前端口为：8585')
})