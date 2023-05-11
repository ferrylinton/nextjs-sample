import { models, model, Schema, Types } from 'mongoose';

const PostSchema: Schema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  lastUpdatedAt: {
    type: Date,
  },
}, {
  virtuals: {
    id: {
      get() {
        return this._id.toHexString();
      }
    }
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.createdAt;
      delete ret.lastUpdatedAt;
    }
  },
  toObject: {
    virtuals: true
  }
});

const Post = models.Post || model('Post', PostSchema, 'posts');

export default Post