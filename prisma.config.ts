import "dotenv/config"; // 確保在此配置初始化前讀取 .env
import { defineConfig, env } from "@prisma/config"; // Prisma 6+ 提供的配置工具

/**
 * 這是 Prisma 6/7 推出的 Programmatic Configuration (程式化配置)
 * 它允許你用 TypeScript 來定義原本寫在 schema.prisma 裡的 datasource 設定
 */
export default defineConfig({
  datasource: {
    /**
     * 使用 env() 輔助函式讀取環境變數
     * 相比於直接用 process.env.DATABASE_URL，
     * Prisma 的 env() 提供了更好的型別檢查與預設值機制。
     */
    url: env("DATABASE_URL"),
  },
});
