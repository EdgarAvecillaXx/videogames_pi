import { config } from 'dotenv';
import path from 'path';
if (process.env.NODE_ENV !== 'production') {
  config({ path: path.join(__dirname, '../../.env') });
}
