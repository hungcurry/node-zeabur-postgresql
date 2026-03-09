import { defineConfig } from '@prisma/config';

// 1. 確保環境變數存在
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

export default defineConfig({
  // Prisma 7 必須明確指定引擎類型，Node.js 環境建議用 classic
  engine: 'classic', 
  datasource: {
    // 這裡的 key (db) 必須對應 schema.prisma 裡的 datasource 名稱
    url: databaseUrl,
  },
});
