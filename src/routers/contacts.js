import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsController);

router.get('/contacts/:contactId', getContactByIdController);

router.post('/contacts', createContactController);

router.patch('/contacts/:contactId', updateContactController);

router.delete('/contacts/:contactId', deleteContactController);

export default router;
