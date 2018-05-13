let path = require('path')
let express = require('express')
let db = require('./../db')
let bodyparser = require('body-parser')
let menuRouter = require('./menuRouter')
let websiteRouter = require('./websiteRouter')

module.exports = (app) => {
  // 设置响应头
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
  })

  app.use(bodyparser.json())

  app.use(bodyparser.urlencoded({ extended: false }))

  app.use(express.static(path.resolve(__dirname, '../')))
  
  Object.values(Object.assign(menuRouter, websiteRouter)).forEach(item => item(app, db))
}