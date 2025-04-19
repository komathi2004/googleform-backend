const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fields: [{
    id: String,
    type: {
      type: String,
      enum: ['text', 'paragraph', 'email', 'number', 'checkbox', 'radio'],
      required: true
    },
    label: String,
    options: [String],
    selectedOptions: [Number]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);