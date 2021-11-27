const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: [true, 'User name required'],
        unique: true
    }, 
    phone: {
        type: Number,
        validate: {
          validator: function(v) {
            return /\d{9}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
      }
});

contactSchema.methods.cleanup = function() {
    return {name: this.name, phone: this.phone};
}

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;