import mongoose from 'mongoose';

const keywordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Image is a model which has a schema imageSchema

export default mongoose.model('Keyword', keywordSchema);