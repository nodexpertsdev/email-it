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
 * @param dirname contains path to the template excluding emails folder
 */
const renderEmail = function (template, templateData, dirname) {
  return new Promise((resolve, reject) => {
    const templateInstance = new EmailTemplate();
    templateInstance.render(`${template}.hbs`, templateData)
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
* @param dirname contains path to the template excluding emails folder
*/
const sendEmail = function (mailDetails, templateData, template, dirname) {
  return new Promise((resolve, reject) => {
    renderEmail(template, templateData, dirname)
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
 * @param path contains path to the template excluding emails folder
 * @param callback returns err or result
 */
  emailit = function(template, mailDetails, path, templateData, callback) {
            const dirname = path;

            if (!template) {
              return callback('template not found, please send email template name');
            } else if (!mailDetails.recepient || !mailDetails.sender || !mailDetails.subject) {
              return callback('mailDetails are not complete, Kindly provide all details');
            }
            sendEmail(mailDetails, templateData, template, dirname)
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
