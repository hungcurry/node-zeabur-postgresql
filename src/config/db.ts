import 'dotenv/config'; // 自動讀取專案根目錄的 .env 檔案並載入環境變數
import { PrismaClient } from '@prisma/client'; // Prisma 核心客戶端
import { PrismaPg } from '@prisma/adapter-pg'; // Prisma 的 PostgreSQL 適配器，用於驅動 pg 套件
import pg from 'pg'; // 傳統的 PostgreSQL 客戶端程式庫

const { Pool } = pg;

/**
 * 建立資料庫連線池 (Connection Pool)
 * 透過環境變數 DATABASE_URL 取得連線資訊
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * 初始化 Prisma 的 PostgreSQL 適配器
 * 這樣 Prisma 就能透過 pg 驅動程式與資料庫溝通
 */
const adapter = new PrismaPg(pool);

/**
 * 定義全域變數的型別
 * 在 Node.js 中，global 是全域物件。為了避免開發模式下 HMR 重複建立實例，
 * 我們將 prisma 實例掛載到 global 上。
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * 實例化 PrismaClient
 * 優先使用全域物件中已存在的實例，若不存在則建立新實例
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // 設定日誌層級，query 會印出所有執行的 SQL 語句，方便開發調試
    log: ['query', 'info', 'warn', 'error'],
  });

/**
 * 在「非生產環境」(Development/Test) 下：
 * 將建立好的 prisma 實例存入全域變數 globalForPrisma。
 * 這是為了防止 Vite/Next.js 的熱更新 (HMR) 導致每次存檔都噴出一個新的 PrismaClient，
 * 避免「Too many connections」或連線洩漏的問題。
 */
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// 預設導出，讓其他模組可以用 import prisma from './db' 匯入
export default prisma;
