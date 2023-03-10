const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please enter a name.'],
    },
    email: {
      type: String,
      require: [true, 'Please enter an email.'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email.',
      ],
    },
    password: {
      type: String,
      require: [true, 'Please enter a password.'],
      minLength: [6, 'Password must be at least 6 characters.'],
      // maxLength: [8, 'Password must not be greater than 8 characters.'],
    },
    photo: {
      type: String,
      require: [true, 'Please add a photo.'],
      default: 'https://i.ibb.co/RhJV2hh/download.png',
    },
    phone: {
      type: String,
      default: '+234',
    },
    bio: {
      type: String,
      maxLength: [250, 'Bio must not be greater than 250 characters.'],
      default: 'Bio',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
