import { ContactCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContact = async (id) => {
  const contact = await ContactCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const createdContact = await ContactCollection.create(payload);
  return createdContact;
};

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = ContactCollection.findByIdAndDelete(contactId);
  return contact;
};
