var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

require('./models/mail.model.js');
require('./routes/mail.route.js')(app);

mongoose.connect('mongodb://localhost/mails');

mongoose.connection.on('error', function () {
  throw new Error('Error while connect with mongodb:mails');
});

app.listen(3000, function(){
  console.log('Server is runnig at port 3000');
});
