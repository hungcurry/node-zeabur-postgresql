
node-zeabur-postgresql
```jsx
// PostgreSQL Connect Command
// 給「人」在終端機輸入
psql "postgresql://root:RDU560JAVsZE92m17Pg4nSlN3zMXbQK8@tpe1.clusters.zeabur.com:22968/nuxt3"

// ~Zeabur選這個填
// MongoDB connection string
// 適合環境變數使用
postgresql://root:RDU560JAVsZE92m17Pg4nSlN3zMXbQK8@tpe1.clusters.zeabur.com:22968/nuxt3


// API網址
https://node-zeabur-postgresql.zeabur.app/users
```

```jsx
node-zeabur-postgresql/
├── prisma/
│   └── schema.prisma         # 資料庫結構定義 (Single Source of Truth)
├── src/
│   ├── config/
│   │   └── db.ts             # Prisma Client 初始化與連線管理
│   ├── models/
│   │   └── user.interface.ts # 定義與資料庫對應的 TS 型別
│   ├── controllers/
│   │   └── userController.ts # 處理請求、呼叫 Service 並回傳回應
│   ├── services/             # (選填) 建議加入，專門放 Prisma 的查詢邏輯
│   │   └── userService.ts
│   ├── routes/
│   │   └── userRoutes.ts     # 路由定義
│   └── app.ts                # Express Middleware 與路由掛載
├── .env                      # 包含 DATABASE_URL
├── index.ts                  # 入口檔案 (啟動伺服器)
├── package.json              # 需加入 @prisma/client, typescript, ts-node 等
└── tsconfig.json             # 建議使用 NodeNext 或 ESNext 模組規範
```

```jsx
npm install @prisma/client
npm install prisma --save-dev

// Prisma 7 需要 PG 來連線資料庫
npm install @prisma/adapter-pg pg
npm install -D @types/pg

// 每當你修改了 schema.prisma，都必須執行：
npx prisma generate
```

```jsx
"scripts": {
  "dev": "prisma generate && nodemon --exec tsx index.ts",
  "build": "prisma generate && tsc",
  "start": "prisma generate && prisma db push && node dist/index.js",
  "db:push": "prisma db push"
},

dev (本地開發):
prisma generate: 確保你的 node_modules 裡有最新的型別，這樣 tsx 跑起來才不會噴 did not initialize yet。
nodemon --exec tsx index.ts: 你最習慣的熱重載方式，負責即時監聽檔案變動。

build (Zeabur 編譯階段):
Zeabur 部署時會執行這行。先產生 Prisma Client，然後用 tsc 把所有的 .ts 轉成 .js 放到 dist 資料夾。

start (Zeabur 運行階段):
prisma db push: 這很重要！因為 Zeabur 的資料庫可能是空的，這行會自動幫你在雲端建立資料表。
node dist/index.js: 執行編譯後的正式版程式碼。

db:push (是你的 「手動同步工具」。):
在開發過程中，當你修改了 prisma/schema.prisma
例如新增了一個欄位或一張表），資料庫並不會自動知道這件事。這時候你就需要執行 npm run db:push。
```



