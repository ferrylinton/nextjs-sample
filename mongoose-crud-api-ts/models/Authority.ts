import { models, model, Schema, Types } from 'mongoose';

const AuthoritySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  versionKey: false
});

const Authority = models.Authority || model('Authority', AuthoritySchema, 'authorities');

export default Authority