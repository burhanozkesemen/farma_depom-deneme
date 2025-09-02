// Application constants
export const APP_CONFIG = {
  name: 'FarmaDepom',
  version: '1.0.0',
  description: 'B2B İlaç Tedarik Platformu',
} as const;

export const USER_ROLES = {
  PHARMACY: 'pharmacy',
  WAREHOUSE: 'warehouse',
  ADMIN: 'admin',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  WAREHOUSES: '/api/warehouses',
  HEALTH: '/api/health',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CART: '/cart',
  PROFILE: '/profile',
} as const;
