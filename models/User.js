import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    nick_name: {
      type: String,
      required: false,
      default: '',
    },
    phone: {
      type: String,
      required: false,
      default: '',
    },
    email: {
      type: String,
      required: false,
      default: '',
    },
    post_address: {
      type: String,
      required: false,
      default: '',
    },
    profession_id: {
      type: String,
      required: false,
      default: '',
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
      type: String,
      enum: ['user', 'profession', 'admin'],
      default: 'user',
    },
    certificate_applied_status: {
      type: String,
      enum: ['none', 'score', 'photo', 'both'],
      default: 'none',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
