'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import PharmacyDashboard from '@/src/components/features/dashboard/PharmacyDashboard';
import WarehouseDashboard from '@/src/components/features/dashboard/WarehouseDashboard';
import AdminDashboard from '@/src/components/features/dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'pharmacy':
      return <PharmacyDashboard />;
    case 'warehouse':
      return <WarehouseDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default DashboardPage;