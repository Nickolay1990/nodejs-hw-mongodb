import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContact } from './services/contacts.js';

export const setupServer = () => {
  const app = express();
  const PORT = Number(getEnvVar('PORT', 3000));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok!' });
  });

  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContact(contactId);
    if (!data) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found url',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
