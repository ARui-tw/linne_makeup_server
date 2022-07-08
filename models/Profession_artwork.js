import mongoose from 'mongoose';

const ArkworkSchema = new mongoose.Schema({
  artwork_url: {
    type: String,
    required: true,
  },
  profession_id: {
    type: String, // There is no 'ObjectId' type, we will check its validity later. detail: https://mongoosejs.com/docs/schematypes.html
    required: true,
  },
});

// Image is a model which has a schema imageSchema

export default mongoose.model('Artwork', ArkworkSchema);
