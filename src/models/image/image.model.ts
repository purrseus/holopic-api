import ISchema, { INumberSchema, IStringSchema } from '../types';
import { Schema, model, SchemaOptions } from 'mongoose';

interface IDefinition {
  status: IStringSchema<StringConstructor>;
  title: IStringSchema<StringConstructor>;
  publicId: IStringSchema<StringConstructor>;
  url: IStringSchema<StringConstructor>;
  width: INumberSchema<NumberConstructor>;
  height: INumberSchema<NumberConstructor>;
  user: IStringSchema<StringConstructor>;
  tags: ISchema<StringConstructor[]>;
  views: ISchema<StringConstructor[]>;
  likes: ISchema<StringConstructor[]>;
}

const definition: IDefinition = {
  status: {
    type: String,
    enum: ['UPLOADED', 'DELETED'],
    required: true,
    default: 'UPLOADED',
  },
  title: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 64,
  },
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  views: {
    type: [String],
    required: true,
    select: false,
  },
  likes: {
    type: [String],
    required: true,
    select: false,
  },
};

const options: SchemaOptions = { timestamps: true };

const imageSchema = new Schema(definition, options);

const Image = model('Image', imageSchema);
export default Image;
