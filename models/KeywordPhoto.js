import mongoose from 'mongoose';

const KeywordPhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  provided_user: {
    type: String,
    required: false,
  },
  keyword_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('KeywordPhoto', KeywordPhotoSchema);
