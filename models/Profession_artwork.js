import mongoose from 'mongoose';

const ArkworkSchema = new mongoose.Schema({
  artwork_url: {
    type: String,
    required: true,
  },
  profession_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Artwork', ArkworkSchema);
