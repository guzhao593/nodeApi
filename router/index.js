let path = require('path')
let express = require('express')
let db = require('./../db')
let bodeParser = require('body-parser')
let menuRouter = require('./menuRouter')
let websiteRouter = require('./websiteRouter')

module.exports = (app) => {
  // 设置响应头
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method === "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
  })

  app.use(bodeParser.json())

  app.use(bodeParser.urlencoded({ extended: false }))

  app.use(express.static(path.resolve(__dirname, '../')))
  // 添加静态资源访问接口
  app.use(express.static(path.resolve(__dirname, '../public')))

  Object.values(Object.assign(menuRouter, websiteRouter)).forEach(item => item(app, db))
}