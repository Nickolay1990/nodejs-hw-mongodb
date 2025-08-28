import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDir.js';
import { TEMP_FOLDER } from './constants/tempFolderPath.js';

await initMongoConnection();
await createDirIfNotExists(TEMP_FOLDER);
setupServer();
