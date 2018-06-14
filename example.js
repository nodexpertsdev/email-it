const emailit = require('./emailit'); //use require(emailit) when installed in project
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
