import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log(`SmartPrice API listening on http://localhost:${env.PORT}`);
});

export default server;
