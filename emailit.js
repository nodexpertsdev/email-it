const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path')
const EmailTemplate = require('email-templates');

var transporter = nodemailer.createTransport( smtpTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
}));

/**
 * getMailOptions
 * @param mailDetails contains name of the template
 * @param html contains html/pug/hbs format template file returned from result of renderEmail
 */
const getMailOptions = function (mailDetails, html) {
  return {
    from: mailDetails.sender, // sender address
    to: mailDetails.recepient, // list of receivers
    subject: mailDetails.subject, // Subject line
    html: html // html body
  }
};

/**
 * renderEmail
 * @param template contains name of the template
 * @param templateData contains data to be used inside the templates
 */
const renderEmail = function (template, templateData, fileFormat) {
  return new Promise((resolve, reject) => {
    const ext = '.' + (fileFormat ? fileFormat : 'pug');
    const templateInstance = new EmailTemplate();
    templateInstance.render(`${template}${ext}`, templateData)
    .then((result) => {
        resolve(result);
    })
    .catch((err) => {
        console.log(err);
    })
  });
};

/**
* sendMail
* @param mailDetails contains recepient, sender, subject
* @param templateData contains data to be used inside the templates
* @param template contains name of the template
*/
const sendEmail = function (mailDetails, templateData, template, fileFormat) {
  return new Promise((resolve, reject) => {
    renderEmail(template, templateData, fileFormat)
    .then((result) => {
      const mailOptions = getMailOptions(mailDetails, result);
      if(!process.env.MAIL_HOST || !process.env.MAIL_SERVICE || !process.env.MAIL_PASSWORD || !process.env.MAIL_USERNAME)
        return reject('\nPlease set your environment variables for MAIL_HOST, MAIL_SERVICE, MAIL_PASSWORD , MAIL_USERNAME');
      return transporter.sendMail(mailOptions,  (error, info) => {
        if (error) {
          return reject(error);
        }
        console.log('Message sent');
        return resolve(info);
      });
    })
    .catch((err) => {
      return reject(err);
    })
  });
}
/**
 * mailIt
 * @param templates contains name of the templates
 * @param mailDetails contains recepient, sender, subject
 * @param callback returns err or result
 */
  emailit = function(template, fileFormat, mailDetails, templateData, callback) {

            if (!template) {
              return callback('Template not found, please send email template name');
            } else if (!mailDetails.recepient || !mailDetails.sender || !mailDetails.subject) {
              return callback('MailDetails are not complete, Kindly provide all details');
            }
            sendEmail(mailDetails, templateData, template, fileFormat)
            .then((res) => {
                console.log('Email sent successfully', res);
                callback(null, res);
            })
            .catch((err) => {
                console.log('Email sent error', err);
                callback(err);
            });
          };

    module.exports = emailit;
