const mongoose = require('mongoose');

// Define the schema for password data
const passwordSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming each password is associated with a specific user
    required: true,
  },
}, { timestamps: true });

// Create the model based on the schema
const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
