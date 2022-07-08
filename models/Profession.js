import mongoose from 'mongoose';

const ProfessionSchema = new mongoose.Schema({
  user_id: {
    type: String, // There is no 'ObjectId' type, we will check its validity later. detail: https://mongoosejs.com/docs/schematypes.html
    required: true,
  },
  certificate_url: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

// Image is a model which has a schema imageSchema

export default mongoose.model('Profession', ProfessionSchema);
