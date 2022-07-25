import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  provided_user: {
    type: String,
    required: true,
  },
  keyword_id: {
    type: String,
    required: false,
  },
  customize_keyword: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
  },
});

export default mongoose.model('Photo', PhotoSchema);
