import mongoose from 'mongoose';

const keywordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Keyword', keywordSchema);
