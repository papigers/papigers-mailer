var nodemailer = require('nodemailer');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var origin = process.env.CORS_ORIGINS || '';
origin = origins.split(',');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: 'https://papigers.github.io' }))

app.post('/', function emailSender(req, res) {
  // res.header('Access-Control-Allow-Origin', '*');
  
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).end('All fields must be filled');
  }
  
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    return res.status(400).end('Email not valid');
  }
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'papigers93@gmail.com',
    subject: `הודעה חדשה מ: ${req.body.name}`,
    text: `שם מלא: ${req.body.name}\n\nאימייל: ${req.body.email}\nהודעה: ${req.body.message}`,
    html: `<h2 style="text-align: center">הודעה חדשה מ: ${req.body.name}</h2>
<p style="direction: rtl">
<b>אימייל:</b> ${req.body.email}<br/>
<b>הודעה:</b> ${req.body.message}</p>
<br/>
<p style="text-align: center"><b>זוהי הודעה אוטמטית, נא לא להשיב למייל זה</b></p>
<p style="text-align: center; color: red;"><b>יש להשיב למייל המצויין בהודעה</b></p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending email');
      console.error(error);
      console.log(info);
      return res.sendStatus(500);
    }
    else {
      console.log('Email sent successfully');
      console.log(info);
      res.sendStatus(200);
    };
  });
});

var server = http.createServer(app);
var PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('\x1b[1m\x1b[32m');
  console.log('Server listening on port: ', PORT, '\x1b[39m');
});
