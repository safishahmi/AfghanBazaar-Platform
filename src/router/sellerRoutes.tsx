import type { JSX } from 'react';
import { matchPath } from './matchPath';
import SellerDashboardPage from '@/pages/seller/SellerDashboardPage';
import SellerInventoryPage from '@/pages/seller/SellerInventoryPage';
import SellerOrdersPage from '@/pages/seller/SellerOrdersPage';
import SellerProductDetailPage from '@/pages/seller/SellerProductDetailPage';
import SellerProductFormPage from '@/pages/seller/SellerProductFormPage';
import SellerProductsPage from '@/pages/seller/SellerProductsPage';
import SellerRegisterPage from '@/pages/seller/SellerRegisterPage';
import SellerSalesPage from '@/pages/seller/SellerSalesPage';
import SellerSettingsPage from '@/pages/seller/SellerSettingsPage';
import SellerShippingPage from '@/pages/seller/SellerShippingPage';
import SellerStorePage from '@/pages/seller/SellerStorePage';

export function sellerRouteElement(path: string): JSX.Element | null {
  if (path === '/sell/register') return <SellerRegisterPage />;
  if (path === '/seller/dashboard') return <SellerDashboardPage />;
  if (path === '/seller/products') return <SellerProductsPage />;
  if (path === '/seller/products/new') return <SellerProductFormPage />;
  if (path === '/seller/inventory') return <SellerInventoryPage />;
  if (path === '/seller/orders') return <SellerOrdersPage />;
  if (path === '/seller/sales') return <SellerSalesPage />;
  if (path === '/seller/store') return <SellerStorePage />;
  if (path === '/seller/shipping') return <SellerShippingPage />;
  if (path === '/seller/settings') return <SellerSettingsPage />;

  const edit = matchPath('/seller/products/:productId/edit', path);
  if (edit) return <SellerProductFormPage productId={edit.productId} />;

  const product = matchPath('/seller/products/:productId', path);
  if (product) return <SellerProductDetailPage productId={product.productId} />;

  return null;
}
