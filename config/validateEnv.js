const { z } = require('zod');

const envSchema = z.object({
  DB_HOST: z.string().nonempty(),
  DB_USER: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
});

// Validate environment variables using Zod
const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error('Environment variable validation error:', parseEnv.error.format());
  process.exit(1);
} else {
  console.log('Environment variables validated successfully');
}
