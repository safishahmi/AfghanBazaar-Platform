import { useMemo } from 'react';
import type { Product } from '@/types/marketplace';
import { useLanguage } from '@/i18n/useLanguage';
import { getOfferProducts, getProductsByTag, getProductsBySellerType } from '@/lib/productQueries';
import ProductSection from '@/components/product/ProductSection';
import PromotionalHeroSlider from '@/components/home/PromotionalHeroSlider';
import IndependentSellersSection from '@/components/home/IndependentSellersSection';
import MlmTeaserSection from '@/components/home/MlmTeaserSection';
import OfficialStoreSection from '@/components/home/OfficialStoreSection';
import TrustSection from '@/components/home/TrustSection';

const SECTION_LIMIT = 4;

function pickUnshown(products: Product[], shown: Set<string>): Product[] {
  const picked = products.filter((product) => !shown.has(product.id)).slice(0, SECTION_LIMIT);
  picked.forEach((product) => shown.add(product.id));
  return picked;
}

function buildHomeProductLists() {
  const shown = new Set<string>();
  const official = pickUnshown(getProductsBySellerType('official'), shown);
  const featured = pickUnshown(getProductsByTag('featured'), shown);
  const seasonal = pickUnshown(getProductsByTag('seasonal'), shown);
  const offers = pickUnshown(getOfferProducts(), shown);
  const newArrivals = pickUnshown(getProductsByTag('new'), shown);
  const popular = pickUnshown(getProductsByTag('popular'), shown);
  return { official, featured, seasonal, offers, newArrivals, popular };
}

export default function HomePage() {
  const { t } = useLanguage();
  const lists = useMemo(buildHomeProductLists, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <PromotionalHeroSlider />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {lists.featured.length > 0 && (
          <ProductSection
            id="featured-heading"
            title={t('Featured products', 'محصولات برگزیده')}
            subtitle={t('A selection of popular picks across categories.', 'انتخاب‌هایی از دسته‌های مختلف.')}
            products={lists.featured}
            viewAllTo="/products"
          />
        )}
        {lists.seasonal.length > 0 && (
          <ProductSection
            id="seasonal-heading"
            title={t('Seasonal products', 'محصولات فصلی')}
            subtitle={t('Sample picks for the current season.', 'انتخاب‌های نمونه برای فصل جاری.')}
            products={lists.seasonal}
            viewAllTo="/products"
          />
        )}
        {lists.offers.length > 0 && (
          <ProductSection
            id="offers-heading"
            title={t('Special offers', 'پیشنهادهای ویژه')}
            subtitle={t('Sample products with a reduced price.', 'محصولات نمونه با قیمت کاهش‌یافته.')}
            products={lists.offers}
            viewAllTo="/products"
          />
        )}
        {lists.newArrivals.length > 0 && (
          <ProductSection
            id="new-arrivals-heading"
            title={t('New arrivals', 'تازه‌های رسیده')}
            subtitle={t('The latest products added to the catalogue.', 'آخرین محصولات اضافه‌شده به کتالوگ.')}
            products={lists.newArrivals}
            viewAllTo="/products"
          />
        )}
        {lists.popular.length > 0 && (
          <ProductSection
            id="popular-heading"
            title={t('Popular products', 'محصولات پرطرفدار')}
            subtitle={t('Products shoppers are looking at most.', 'محصولاتی که بیشتر مشتریان به آن‌ها نگاه می‌کنند.')}
            products={lists.popular}
            viewAllTo="/products"
          />
        )}

        <OfficialStoreSection products={lists.official} />
        <IndependentSellersSection />
        <MlmTeaserSection />
      </div>

      <TrustSection />
    </>
  );
}
