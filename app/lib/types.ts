export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  mainImageUrl: string;
  imageUrls: string[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  mainImageUrl: string;
  imageUrls?: string[];
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  mainImageUrl?: string;
  imageUrls?: string[];
  categoryId?: string;
}

export interface CreateCategoryInput {
  name: string;
  description: string;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
} 