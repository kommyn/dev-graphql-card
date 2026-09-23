import { registerAs } from '@nestjs/config';

export default registerAs('writeAccessConfig', () => ({
  apiKey: process.env['API_KEY'] as string,
}));
