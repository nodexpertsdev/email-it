# NPM PACKAGE emailit
 This will allow you to send emails using smtpTransport via nodemailer

# **#INSTALL**
Install emailIt package to your machine using this command,


      npm i emailIt

# Parameters
```emailit(template, mailDetails, path, templateData, callback);```


 - template : Name of the template you wish to render in email;  
 - mailDetails:
   -recepient: (email address of the receiver),
   -sender: (email address of the sender),
    -subject: (Subject of the email),

 - path: (Mention the path where you template resides),

 - templateData: (relevant template data that your templates need
   dynamically),



 - callback: A callback function;

**#ENVIRONMENT VARIABLES REQUIRED**
 - MAIL_USERNAME=''   
 - MAIL_PASSWORD=''    
 - MAIL_HOST=''   gmail || mailgun || yahoo etc
 - MAIL_SERVICE=''  smtp.gmail.com || smtp.yahoo.com || smtp.sendgrid.net || smtp.mailgun.com (depending upon your host)

**#USE**
 Import/require 'emailit' from newPackage
 Define parameter's value before calling emailIt or pass it directly in the function call

*Eg:*

    const emailit = require('./emailit');
    emailit(template, mailDetails, path, templateData, (err,res)=> {});


**#EXAMPLE**
Refer example.js for implementation

    const emailit = require('./emailit');

    const example = function() {
      const mailDetails = {
        'recepient': 'efg@hij.com',
        'sender': 'abc@def.com',
        'subject': 'Its Working'
      }
      const path = '/';
      const templateData = {
        name: "XYZ"
      }
      emailit(template = 'verify-email', mailDetails, path, templateData, (err,res)=> {
        if(err) {
          console.log('Sending email Failed');
        } else {
          console.log('Email is successfully sent.');
        }

      })
    };

    example();
