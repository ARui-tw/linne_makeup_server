import mongoose from 'mongoose';

const RelativeScoreSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('RelativeScore', RelativeScoreSchema);
