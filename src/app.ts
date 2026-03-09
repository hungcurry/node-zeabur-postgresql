import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json())

// 偵錯 Header
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('X-Debug-Status', 'TS-Enabled-V2')
  next()
})

// 基礎路由
app.get('/', (req: Request, res: Response): void => {
  res.send('Express Server is running and connected to Zeabur MongoDB (TS Version)!')
})

// 健康檢查 API
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok' })
})

// 路由分流
app.use('/users', userRoutes);

export default app;
