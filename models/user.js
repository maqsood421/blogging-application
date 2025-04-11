const { Schema, model } = require("mongoose");
const {createHmac, randomBytes} = require("node:crypto");


const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    salt: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageUrl: {
        type: String,
        default: '/images/default.svg',
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
  },
  { timestamps: true }
);


userSchema.pre('save', function (next) {
    const user = this;

    if(!user.isModified('password'))
        return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = model('user', userSchema);
module.exports = User;