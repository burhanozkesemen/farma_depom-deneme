import MainLayout from '@/src/components/layout/MainLayout';
import ProductDetailPage from '@/src/components/features/products/ProductDetailPage';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <MainLayout>
      <ProductDetailPage productId={params.id} />
    </MainLayout>
  );
}
