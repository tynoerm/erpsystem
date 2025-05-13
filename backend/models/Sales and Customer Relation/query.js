import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const queriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'unsolved', // Default value set to 'unsolved'
    },
    replyMessage: {
      type: String,
      default: '',
    },
  },
  {
    collection: 'queries', // Collection name in MongoDB
  }
);

export default model('queries', queriesSchema);
