import type { Request, Response } from 'express';
import prisma from '../config/db.js';
import type { IUserCreateInput, IUserUpdateInput } from '../models/User.js';

/**
 * 建立使用者
 */
export const createUser = async (req: Request, res: Response) => {
  const { name, age, role } = req.body as IUserCreateInput;
  try {
    const newUser = await prisma.user.create({
      data: { name, age, role },
    });
    res.status(201).json(newUser);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '未知錯誤';
    res.status(400).json({ error: '無法建立使用者', details: message });
  }
};

/**
 * 取得所有使用者
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: unknown) {
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
};

/**
 * 根據 ID 取得單一使用者
 */
export const getUserById = async (req: Request, res: Response) => {
  // 修正：使用型別斷言解決 string | string[] 衝突
  const id = req.params.id as string;

  if (!id) return res.status(400).json({ error: 'ID 為必要參數' });

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) return res.status(404).json({ error: '找不到使用者' });
    res.json(user);
  } catch (error: unknown) {
    res.status(400).json({ error: '查詢失敗' });
  }
};

/**
 * 更新使用者資料
 */
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body as IUserUpdateInput;

  if (!id) return res.status(400).json({ error: 'ID 為必要參數' });

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.json(updatedUser);
  } catch (error: unknown) {
    res.status(400).json({ error: '更新失敗' });
  }
};

/**
 * 刪除使用者
 */
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) return res.status(400).json({ error: 'ID 為必要參數' });

  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: '使用者已刪除' });
  } catch (error: unknown) {
    res.status(400).json({ error: '刪除失敗' });
  }
};
