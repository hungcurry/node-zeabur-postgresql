import { PrismaClient } from '@prisma/client';

// 確保全域只有一個 Prisma 實例，避免開發環境熱重載產生過多連線
const prisma = new PrismaClient();

export default prisma;
