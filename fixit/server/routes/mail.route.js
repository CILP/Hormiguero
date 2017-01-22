module.exports = function(app){

  var mails = require('../controllers/mail.controller.js');
  
  app.get('/mail', mails.getAll);
  app.get('/mail/:p/:v', mails.getByProperty);
};
