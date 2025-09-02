import MainLayout from '@/src/components/layout/MainLayout';
import WarehouseDetailPage from '@/src/components/features/products/WarehouseDetailPage';

interface WarehousePageProps {
  params: {
    id: string;
  };
}

export default function WarehousePage({ params }: WarehousePageProps) {
  return (
    <MainLayout>
      <WarehouseDetailPage warehouseId={params.id} />
    </MainLayout>
  );
}
