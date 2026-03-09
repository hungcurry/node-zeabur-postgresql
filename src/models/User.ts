export interface IUserCreateInput {
  name: string;
  age: number;
  role: string;
}

export interface IUserUpdateInput {
  name?: string;
  age?: number;
  role?: string;
}
