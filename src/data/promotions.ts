import type { PromoSlide, PromoSlideConfig } from '@/types/promotions';
import { getDiscountPercent, getProductById } from '@/lib/productQueries';

const PROMO_SLIDE_CONFIG: PromoSlideConfig[] = [
  {
    id: 'autumn-essentials',
    kind: 'seasonal',
    source: 'image',
    eyebrow: { en: 'Autumn picks | Sample', prs: 'انتخاب پاییزی | نمونه' },
    title: { en: 'Autumn harvest essentials', prs: 'لوازم برداشت پاییزی' },
    text: {
      en: 'Fresh vegetables, mixed spices, and gift boxes for the season. Demonstration offer only.',
      prs: 'سبزیجات تازه، ادویه‌جات مخلوط و جعبه هدیه برای این فصل. فقط پیشنهاد نمایشی.',
    },
    imageUrl: 'https://images.pexels.com/photos/5425794/pexels-photo-5425794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: {
      en: 'Basket of fresh vegetables on a wooden table',
      prs: 'سبد سبزیجات تازه روی میز چوبی',
    },
    cta: { label: { en: 'Shop seasonal picks', prs: 'خرید انتخاب‌های فصلی' }, to: '/products' },
  },
  {
    id: 'demo-price-drop',
    kind: 'discount',
    source: 'product',
    productId: 'laptop-14-inch',
    eyebrow: { en: 'Sample price drop', prs: 'کاهش قیمت نمونه' },
    text: {
      en: 'A sample discount for preview only. This is not a live commercial offer.',
      prs: 'تخفیف نمونه فقط برای نمایش. این یک پیشنهاد تجاری فعال نیست.',
    },
    cta: { label: { en: 'View product', prs: 'مشاهده محصول' }, to: '/product/laptop-14-inch' },
  },
  {
    id: 'featured-headphones',
    kind: 'featured',
    source: 'product',
    productId: 'wireless-over-ear-headphones',
    eyebrow: { en: 'Featured product', prs: 'محصول برگزیده' },
    text: {
      en: 'One of the most viewed picks in our sample catalogue.',
      prs: 'یکی از پربازدیدترین انتخاب‌ها در کتالوگ نمونه.',
    },
    cta: { label: { en: 'See details', prs: 'مشاهده جزئیات' }, to: '/product/wireless-over-ear-headphones' },
  },
  {
    id: 'official-store',
    kind: 'official',
    source: 'image',
    eyebrow: { en: 'AfghanBazaar Official Store', prs: 'فروشگاه رسمی افغان بازار' },
    title: { en: 'Sold directly by AfghanBazaar', prs: 'مستقیماً توسط افغان بازار فروخته می‌شود' },
    text: {
      en: 'Products owned and sold by us carry the official store label, separate from independent sellers.',
      prs: 'محصولاتی که خود ما مالک و فروشنده آن هستیم، برچسب فروشگاه رسمی دارند و جدا از فروشندگان مستقل است.',
    },
    imageUrl: 'https://images.pexels.com/photos/34357798/pexels-photo-34357798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: {
      en: 'Shelf stocked with packaged groceries in a store',
      prs: 'قفسه‌ای پر از مواد غذایی بسته‌بندی‌شده در یک فروشگاه',
    },
    cta: { label: { en: 'Shop official products', prs: 'خرید محصولات رسمی' }, to: '/products?source=official' },
  },
  {
    id: 'marketplace-update',
    kind: 'announcement',
    source: 'image',
    eyebrow: { en: 'Marketplace update | Demo', prs: 'اطلاعیه بازار | نمونه' },
    title: { en: 'Ten categories, one marketplace', prs: 'ده دسته، یک بازار' },
    text: {
      en: 'Electronics, clothing, food, books, and more in one place. The catalogue shown is sample data.',
      prs: 'الکترونیک، پوشاک، خوراکی، کتاب و بیشتر در یک جا. کتالوگ نمایش‌داده‌شده نمونه است.',
    },
    imageUrl: 'https://images.pexels.com/photos/4440801/pexels-photo-4440801.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: {
      en: 'Courier carrying stacked cardboard parcels',
      prs: 'پیک با بسته‌های کارتنی روی هم',
    },
    cta: { label: { en: 'Browse all products', prs: 'مشاهده همه محصولات' }, to: '/products' },
  },
];

export function getPromoSlides(): PromoSlide[] {
  return PROMO_SLIDE_CONFIG.flatMap((slide): PromoSlide[] => {
    if (slide.source === 'image') {
      return [
        {
          id: slide.id,
          kind: slide.kind,
          eyebrow: slide.eyebrow,
          title: slide.title,
          text: slide.text,
          imageUrl: slide.imageUrl,
          imageAlt: slide.imageAlt,
          cta: slide.cta,
        },
      ];
    }

    const product = getProductById(slide.productId);
    if (!product) return [];
    const discountPercent = getDiscountPercent(product);
    if (slide.kind === 'discount' && discountPercent === null) return [];

    return [
      {
        id: slide.id,
        kind: slide.kind,
        eyebrow: slide.eyebrow,
        title: product.name,
        text: slide.text,
        imageUrl: product.imageUrl,
        imageAlt: product.name,
        cta: slide.cta,
        price: { current: product.price, previous: product.oldPrice, discountPercent },
      },
    ];
  });
}
