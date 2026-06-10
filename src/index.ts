import app from './app.js';
import { env, isLocal } from './config/env.js';

const port = env.PORT || 3000;
const API_URL = isLocal ? `${env.API_BASE_URL}:${port}` : env.API_BASE_URL;

app.listen(port, () => {
  console.log(`Server running on ${API_URL}`);
});
