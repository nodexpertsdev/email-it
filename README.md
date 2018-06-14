# NPM PACKAGE emailit
 This will allow you to send emails using smtpTransport via nodemailer

# **#INSTALL**
Install emailIt package to your machine using this command,


      npm i emailit

# Parameters
```emailit(template, fileFormat, mailDetails, templateData, callback);```


 - template : Name of the template you wish to render in email;  
 - fileFormat : Format of the file you are sending. eg: 'hbs', 'pug'
                NOTE: If the template format is html, keep the fileFormat param to hbs and also, update your actual template format.
                Because hbs format renders the required template and returns an html file 

 - mailDetails:
   -recepient: (email address of the receiver),
   -sender: (email address of the sender),
    -subject: (Subject of the email),

 - templateData: (relevant template data that your templates need
   dynamically),

 - template : Name of the template you wish to render in email;  

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
    emailit(template, fileFormat, mailDetails, templateData, (err,res)=> {});


**#EXAMPLE**
Refer example.js for implementation

    const emailit = require('./emailit'); 

    const example = function() {
      const mailDetails = {
        'recepient': 'efg@hij.com',
        'sender': 'abc@def.com',
        'subject': 'Its Working'
      }
      
      const templateData = {
        name: "XYZ"
      }
      emailit(template = 'verify-email', fileFormat = 'hbs', mailDetails, templateData, (err,res)=> {
        if(err) {
          console.log('Sending email Failed');
        } else {
          console.log('Email is successfully sent.');
        }

      })
    };

    example();
