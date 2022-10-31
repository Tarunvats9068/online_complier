const express  = require('express');
const app = express();
const port = process.env.PORT || 8000;
var request = require('request');
const path  = require('path');
require('dotenv').config();
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.post('/complier_data',function(req,res){
  var program = {
    script :req.body.code,
    language: req.body.lang,
    stdin:req.body.input,
    versionIndex:"0",
    clientId:process.env.clientId,
    clientSecret:process.env.clientSecret
};
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
  if(req.xhr)
  {
    return  res.status(200).json({
      data:
      {
        code:body
      },
      message:"code is sent"
    })
  }
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', body);
    return res.redirect('/');
})
}
)
app.get('/',function(req,res)
{
  return res.render('index');
})




app.listen(port,function(err)
{
    if(err)
    {
        console.log("server is not running");
        return ;
    }
    else
    {
      return console.log("server is running on the port ",port);
    }
})
