let express = require('express')

let router = require('./router')

let app = express()

router(app)

app.listen(593, () => {
  console.log('当前接口地址：http://localhost:593')
})