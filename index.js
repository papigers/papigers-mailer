var nodemailer = require('nodemailer');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/contact-form', function emailSender(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.USERNAME,
    to: 'papigers93@gmail.com',
    subject: `הודעה חדשה מ: ${req.body['first-name']}`,
    text: `שם מלא: ${req.body['first-name']}\nחברה: ${req.body.company}\nאימייל: ${req.body.email}\nהודעה: ${req.body.message}`,
    html: `<h2 style="text-align: center">הודעה חדשה מ: ${req.body['first-name']}</h2>
<p style="text-align: center"><b>חברה:</b> ${req.body.company}<br/>
<b>אימייל:</b> ${req.body.email}<br/>
<b>הודעה:</b> ${req.body.message}</p>
<br/>
<p style="text-align: center"><b>זוהי הודעה אוטמטית, נא לא להשיב למייל זה</b></p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error in sedning email');
      console.dir(error);
      console.dir(info);
      res.end('Error in sedning email');
    }
    else {
      console.log('Successful in sedning email');
      console.dir(info);
      res.end('Successful in sedning email');
    };
  });
});

var server = http.createServer(app);
var PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('\x1b[1m\x1b[32m');
  console.log('Server listening on port: ', PORT, '\x1b[39m');
});