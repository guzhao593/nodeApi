const http = require('http')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
function crawler (cb) {
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
          let hotList = []
          let boardidArr = []
          $('#box-cont .box-cont:nth-child(4) .bd .tab .tab-hd ul li').each(function (key) {
            hotList[key] = {
              order: key + 1,
              title: $(this).text(),
              data: []
            }
            boardidArr.push($(this).attr('data'))
          })
          Promise.all(boardidArr.map((id, key) => {
            return new Promise(resolve => {
              const listRequest = http.get(`http://top.baidu.com/detail/list?boardid=${id}`, (listReq) => {
              let dataArr = []
              let arrLength = 0
              listReq.on('data', data => {
                dataArr.push(data)
                arrLength += data.length
              })
              listReq.on('end', () => {
                const dataBuffer = JSON.parse(iconv.decode(Buffer.concat(dataArr, arrLength), 'utf8'))
                    hotList[key].data = dataBuffer.list.map((item, key) => {
                    return {
                        order: key + 1,
                        title: item.keyword,
                        href: item.links[4][0],
                        searches: item.searches
                      }
                    })
                    resolve(hotList)
                })
              })
              listRequest.end()
            })
          })).then(data=> {
            cb(data[0])
          })
      })
  })
  request.end()
}

module.exports = crawler