import mongoose from 'mongoose';
const { Schema } = mongoose;

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const sessionSchema = new Schema({
  isActive: {
    type: Boolean,
    default: true,
  },
  attendees: [attendeeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Session', sessionSchema);