import mongoose from 'mongoose';

const AbsoluteScoreSchema = new mongoose.Schema({
  photo_id: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('AbsoluteScore', AbsoluteScoreSchema);
