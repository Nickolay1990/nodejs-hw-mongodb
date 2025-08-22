import { ContactCollection } from '../db/models/contact.js';
import { getPaginateData } from '../utils/getPaginationData.js';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
  userId,
) => {
  const contactsQuery = ContactCollection.find({ userId });
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

export const getContact = async (id, userId) => {
  const contact = await ContactCollection.findOne({ _id: id, userId });
  return contact;
};

export const createContact = async (payload, id) => {
  const createdContact = await ContactCollection.create({
    ...payload,
    userId: id,
  });
  return createdContact;
};

export const updateContact = async (contactId, payload, userId) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    payload,
    { new: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
