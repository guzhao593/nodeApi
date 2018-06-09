const http = require('http')
const cheerio = require('cheerio')
const qs = require('querystring')

const data = { v: 1, fr: 'topcategory_c18' }

const content = qs.stringify(data)

const request = http.get(`http://top.baidu.com?${content}`, (req, res) => {
    var html='';  
    req.on('data',function(data){  
        html+=data;  
    })
    req.on('end',function(){  
        const $ = cheerio.load(html)
        console.log($('.box-hot .current').text())
    })
})
request.end()