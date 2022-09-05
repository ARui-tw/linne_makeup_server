import mongoose from 'mongoose';

const keywordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Keyword', keywordSchema);
