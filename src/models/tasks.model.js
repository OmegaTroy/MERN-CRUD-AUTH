import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  done: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('Task', taskSchema);