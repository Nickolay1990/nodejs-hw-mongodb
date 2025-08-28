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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../utils/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', validateParams(paramsValidationSchema), getContactsController);

router.get('/:contactId', validateId, getContactByIdController);

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactsValidationSchema),
  createContactController,
);

router.patch(
  '/:contactId',
  validateId,
  upload.single('photo'),
  validateBody(updateContactsValidationSchema),
  updateContactController,
);

router.delete('/:contactId', validateId, deleteContactController);

export default router;
