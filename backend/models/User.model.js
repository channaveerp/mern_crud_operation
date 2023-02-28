// step 6 usermodel creating here...
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
