const http = require('http')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const qs = require('querystring')

// const data = { v: 1, fr: 'topcategory_c18' }
// const content = qs.stringify(data)
let newsData = []
const request = http.get(`http://top.baidu.com`, (req, res) => {
    let length = 0
    let arr = []
    req.on('data',function(data){
        arr.push(data)
        length += data.length
    })
    req.on('end',function(){
        const data = Buffer.concat(arr, length)  
        const $ = cheerio.load(iconv.decode(data, 'gb2312'))
        let hotList = {}
        hotList.title = $('.box-hot .current').text()
        hotList.data = []
        $('#box-cont .box-cont:nth-child(4) .bd .tab .tab-bd .tab-box').each(function (key) {
          $(this).children('.item-list').children('li').each(function (key) {
            const ele = $(this).children('.item-hd')
            hotList.data[key] = {
              order: ele.children('span').first().text(),
              title: ele.children('a').first().text(),
              href: ele.children('a').first().attr('href')
            }
          })
        })
        console.log(hotList.data)
    })
})
request.end()