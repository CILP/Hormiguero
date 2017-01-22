var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mail;

var MailSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  share: Boolean,
  acquire: Boolean,
  personType: String,
  date: {
    type: Date,
    required: true
  }
});

Mail = mongoose.model('Mail', MailSchema);

module.exports = Mail;
