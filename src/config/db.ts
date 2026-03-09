import 'dotenv/config'; // 👈 重要：確保程式啟動時先讀取 .env
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing in environment variables');
}

// 實作 Singleton 模式，避免 Vite/Nodemon 熱重載導致連線過多
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Prisma 7 必須在這裡手動傳入連線字串
    datasourceUrl: databaseUrl,
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
