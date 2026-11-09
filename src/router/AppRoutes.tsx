import { useRouter } from './useRouter';
import { matchPath } from './matchPath';
import { sellerRouteElement } from './sellerRoutes';
import { AdminAccessProvider } from '@/admin/AdminAccessProvider';
import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AboutPage from '@/pages/AboutPage';
import AdminOverviewPage from '@/pages/admin/AdminOverviewPage';
import AccountAddressesPage from '@/pages/account/AccountAddressesPage';
import AccountDashboardPage from '@/pages/account/AccountDashboardPage';
import AccountOrderDetailsPage from '@/pages/account/AccountOrderDetailsPage';
import AccountOrdersPage from '@/pages/account/AccountOrdersPage';
import AccountProfilePage from '@/pages/account/AccountProfilePage';
import AccountSettingsPage from '@/pages/account/AccountSettingsPage';
import AccountWishlistPage from '@/pages/account/AccountWishlistPage';
import CartPage from '@/pages/CartPage';
import ContactPage from '@/pages/ContactPage';
import HomePage from '@/pages/HomePage';
import InfoPage from '@/pages/InfoPage';
import LoginPage from '@/pages/LoginPage';
import MlmPage from '@/pages/MlmPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import ProductListingPage from '@/pages/ProductListingPage';
import SellerInfoPage from '@/pages/SellerInfoPage';
import WishlistPage from '@/pages/WishlistPage';
import AdminDashboardPage from '@/pages/preview/AdminDashboardPage';
import HomePrototypePage from '@/pages/preview/HomePrototypePage';
import PreviewHubPage from '@/pages/preview/PreviewHubPage';
import ProductPrototypePage from '@/pages/preview/ProductPrototypePage';
import RoadmapPage from '@/pages/preview/RoadmapPage';
import PreviewSellerDashboardPage from '@/pages/preview/SellerDashboardPage';
import { SellerAccessGate } from '@/seller/SellerAccessGate';
import { SellerAuthProvider } from '@/seller/SellerAuthProvider';

export default function AppRoutes() {
  const { path } = useRouter();

  const sellerPage = sellerRouteElement(path);
  if (sellerPage) {
    return (
      <SellerAuthProvider>
        <SellerAccessGate>{sellerPage}</SellerAccessGate>
      </SellerAuthProvider>
    );
  }

  if (path === '/') return <HomePage />;
  if (path === '/products') return <ProductListingPage />;
  if (path === '/cart') return <CartPage />;
  if (path === '/wishlist') return <WishlistPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/sell') return <SellerInfoPage />;
  if (path === '/mlm') return <MlmPage />;
  if (path === '/admin') {
    return (
      <AdminAccessProvider>
        <AdminAccessGate>
          <AdminOverviewPage />
        </AdminAccessGate>
      </AdminAccessProvider>
    );
  }
  if (path === '/login') return <LoginPage />;
  if (path === '/account') return <AccountDashboardPage />;
  if (path === '/account/profile') return <AccountProfilePage />;
  if (path === '/account/addresses') return <AccountAddressesPage />;
  if (path === '/account/orders') return <AccountOrdersPage />;
  if (path === '/account/wishlist') return <AccountWishlistPage />;
  if (path === '/account/settings') return <AccountSettingsPage />;
  if (path === '/preview') return <PreviewHubPage />;
  if (path === '/preview/home') return <HomePrototypePage />;
  if (path === '/preview/product') return <ProductPrototypePage />;
  if (path === '/preview/seller') return <PreviewSellerDashboardPage />;
  if (path === '/preview/admin') return <AdminDashboardPage />;
  if (path === '/preview/roadmap') return <RoadmapPage />;

  const product = matchPath('/product/:productId', path);
  if (product) return <ProductDetailsPage productId={product.productId} />;

  const accountOrder = matchPath('/account/orders/:orderId', path);
  if (accountOrder) return <AccountOrderDetailsPage orderId={accountOrder.orderId} />;

  const info = matchPath('/info/:slug', path);
  if (info) return <InfoPage slug={info.slug} />;

  return <NotFoundPage />;
}
