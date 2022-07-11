import mongoose from 'mongoose';

const ProfessionSchema = new mongoose.Schema({
  user_id: {
    type: String,
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

export default mongoose.model('Profession', ProfessionSchema);
