import mongoose from 'mongoose'

const userSchemas = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { versionKey: false, timestamps: true }
);


export default mongoose.model('User', userSchemas)