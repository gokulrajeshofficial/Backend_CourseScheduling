const nodemailer = require('nodemailer');

module.exports = async(reciever)=>{
    console.log(reciever)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME ,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  
  var mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: reciever,
    subject: 'Course has been registered',
    html: `<h1>Welcome to Coursotype</h1> 
    <b><p>Hi user, </p></b> 
    <p>Your course has been registered . Now you will be able to login to you account using the registered email and password.
     The sheduled dates of the classess of different subjects are given in fixed slots.Book them in advance to get the slot first </p>
     <p><b>Best regards <br>
     Coursotype team</b></p>`
     
   
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}