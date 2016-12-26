var nodemailer = require('nodemailer');
var express = require('express');
var http = require('http');

var app = express();

app.post('/contact-form', function emailSender(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: 'papigers93@gmail.com',
    to: 'gershon@mouseux.com',
    subject: 'Email Example',
    text: 'Hello World',
    html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({
        yo: 'error'
      });
    } else {
      console.log('Message sent: ' + info.response);
      res.json({
        yo: info.response
      });
    };
  });
});

var server = http.createServer(app);
var PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('\x1b[1m\x1b[32m');
  console.log('Server listening on port: ', PORT, '\x1b[39m');
});