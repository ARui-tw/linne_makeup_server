import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema({
  artwork_url: {
    type: String,
    required: true,
  },
  profession_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Artwork', ArtworkSchema);
