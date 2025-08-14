import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsValidationSchema } from '../validation/CreateContact.js';
import { updateContactsValidationSchema } from '../validation/UpdateContact.js';
import { validateId } from '../middlewares/validateId.js';
import { validateParams } from '../middlewares/validateParams.js';
import { paramsValidationSchema } from '../validation/paramsValidation.js';

const router = Router();

router.get(
  '/contacts',
  validateParams(paramsValidationSchema),
  getContactsController,
);

router.get('/contacts/:contactId', validateId, getContactByIdController);

router.post(
  '/contacts',
  validateBody(createContactsValidationSchema),
  createContactController,
);

router.patch(
  '/contacts/:contactId',
  validateId,
  validateBody(updateContactsValidationSchema),
  updateContactController,
);

router.delete('/contacts/:contactId', validateId, deleteContactController);

export default router;
