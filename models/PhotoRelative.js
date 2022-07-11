import mongoose from 'mongoose';

const PhotoRelativeSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  photo_id: {
    type: String,
    required: true,
  },
  relative_score_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('PhotoRelative', PhotoRelativeSchema);
