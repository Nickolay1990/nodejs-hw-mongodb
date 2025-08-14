import { ContactCollection } from '../db/models/contact.js';
import { getPaginateData } from '../utils/getPaginationData.js';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
) => {
  const contactsQuery = ContactCollection.find();
  const skip = perPage * (page - 1);

  if (filters.type) {
    contactsQuery.where('contactType').equals(filters.type);
  }

  if (typeof filters.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const [contacts, contactsCount] = await Promise.all([
    ContactCollection.find()
      .merge(contactsQuery)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
    ContactCollection.find().merge(contactsQuery).countDocuments(),
  ]);

  const paginateData = getPaginateData(page, perPage, contactsCount);

  return {
    data: contacts,
    ...paginateData,
  };
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
