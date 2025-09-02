export type UserRole = 'pharmacy' | 'warehouse' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyName: string;
  taxId?: string;
  address?: string;
  phone?: string;
  isVerified: boolean;
  createdAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  barcode?: string;
  activeIngredient?: string;
  price: number;
  stock?: number;
  warehouseId?: string;
  warehouseName?: string;
  isApproved?: boolean;
  image?: string;
  imageUrl?: string;
  description?: string;
  dosage?: string;
  form?: string;
  manufacturer?: string;
  createdAt?: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  pharmacyId: string;
  warehouseId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'approved' | 'rejected' | 'shipped' | 'delivered';
  createdAt: Date;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
}