import CategoryProvider from '@/catalog/CategoryProvider';
import { CartProvider } from '@/cart/CartProvider';
import Layout from '@/components/layout/Layout';
import PromoSlideProvider from '@/content/PromoSlideProvider';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import AppRoutes from '@/router/AppRoutes';
import { RouterProvider } from '@/router/RouterProvider';
import { WishlistProvider } from '@/wishlist/WishlistProvider';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <CategoryProvider>
          <PromoSlideProvider>
            <CartProvider>
              <WishlistProvider>
                <Layout>
                  <AppRoutes />
                </Layout>
              </WishlistProvider>
            </CartProvider>
          </PromoSlideProvider>
        </CategoryProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}

export default App;
