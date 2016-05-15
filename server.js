var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()

app.get('/scrape', function (req, res) {
  var url = 'http://www.gasnaturalfenosa.md/'
  request(url, function (error, response, html) {
    if (error) throw error
    if (!error) {
      var $ = cheerio.load(html)
      var title, content, date
      var json = {
        title: '',
        content: '',
        date: ''
      }
      $('.views-field-title').filter(function () {
        var data = $(this)
        title = data.children().first().children().text()
        json.title = title
      })
      $('.views-field-body').filter(function () {
        var data = $(this)
        content = data.children().first().children().text()
        json.content = content
      })
      $('.views-field-created').filter(function () {
        var data = $(this)
        date = data.children().first().text()
        json.date = date
      })
    }
    console.log(json)
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
      if (err) throw err
      console.log('File successfully written! - Check your project directory for the output.json file')
    })
    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081')
