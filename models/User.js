import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nick_name: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  post_address: {
    type: String,
    required: false,
  },
  profession_id: {
    type: String,
    required: false,
  },
  total_score_count: {
    type: Number,
    required: true,
    default: 0,
  },
  total_upload_count: {
    type: Number,
    required: true,
    default: 0,
  },
  rank: {
    type: 'enum',
    values: ['user', 'profession', 'admin'],
    default: 'user',
  },
  certificate_applied_status: {
    type: 'enum',
    values: ['none', 'score', 'photo', 'both'],
    default: 'none',
  },
});

export default mongoose.model('User', UserSchema);
