import { model, Schema, Types } from 'mongoose';
import { CONTACT_TYPES } from '../../constants/contactTypes.js';

export const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPES,
      required: true,
      default: 'personal',
    },
    userId: {
      required: true,
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactCollection = model('contacts', contactSchema);
