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
