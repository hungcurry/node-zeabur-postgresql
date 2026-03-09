import { defineConfig } from '@prisma/config';

// 確保環境變數存在，且型別為 string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined. Please check your .env file.');
}

export default defineConfig({
  // PostgreSQL 專案建議使用 "classic"
  engine: 'classic', 
  datasource: {
    url: databaseUrl,
  },
});
