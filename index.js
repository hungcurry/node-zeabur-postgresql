const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors'); // 1. 引入 cors

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// 2. 啟用 CORS
// 預設 app.use(cors()) 會允許所有網域請求
// 實務上可以設定為 app.use(cors({ origin: 'http://127.0.0.1:8080' }))
app.use(cors());


app.use(bodyParser.json());

// 1. Create - 新增使用者
app.post('/users', async (req, res) => {
  const { name, age, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, age, role },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: '無法建立使用者', details: error.message });
  }
});

// 2. Read - 取得所有使用者
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// 3. Read - 取得單一使用者
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user) return res.status(404).json({ error: '找不到使用者' });
  res.json(user);
});

// 4. Update - 更新使用者
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, age, role },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: '更新失敗' });
  }
});

// 5. Delete - 刪除使用者
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: '使用者已刪除' });
  } catch (error) {
    res.status(400).json({ error: '刪除失敗' });
  }
});

app.listen(PORT, () => {
  console.log(`伺服器運行中: http://localhost:${PORT}`);
});
