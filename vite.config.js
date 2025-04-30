import { defineConfig } from 'vite';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  define: {
    'process.env.FORMSPREE_FORM_ID': JSON.stringify(process.env.FORMSPREE_FORM_ID)
  }
});
