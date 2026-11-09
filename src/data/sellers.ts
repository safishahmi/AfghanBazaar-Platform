import type { Seller } from '@/types/marketplace';

export const SELLERS = {
  official: {
    id: 'afghanbazaar-official',
    name: { en: 'AfghanBazaar Official Store', prs: 'فروشگاه رسمی افغان بازار' },
    type: 'official',
  },
  kabulTechHub: {
    id: 'kabul-tech-hub',
    name: { en: 'Kabul Tech Hub', prs: 'مرکز تکنالوژی کابل' },
    type: 'independent',
  },
  heratHomeCrafts: {
    id: 'herat-home-crafts',
    name: { en: 'Herat Home Crafts', prs: 'صنایع دستی خانگی هرات' },
    type: 'independent',
  },
  kandaharFashionHouse: {
    id: 'kandahar-fashion-house',
    name: { en: 'Kandahar Fashion House', prs: 'خانه مد قندهار' },
    type: 'independent',
  },
  kabulBeautyLab: {
    id: 'kabul-beauty-lab',
    name: { en: 'Kabul Beauty Lab', prs: 'لابراتوار زیبایی کابل' },
    type: 'independent',
  },
  mazarAgroSupply: {
    id: 'mazar-agro-supply',
    name: { en: 'Mazar Agro Supply', prs: 'تهیه‌کننده زراعتی مزار' },
    type: 'independent',
  },
  nangarharBookCenter: {
    id: 'nangarhar-book-center',
    name: { en: 'Nangarhar Book Center', prs: 'مرکز کتاب ننگرهار' },
    type: 'independent',
  },
} satisfies Record<string, Seller>;

export const INDEPENDENT_SELLERS: Seller[] = Object.values(SELLERS).filter(
  (seller) => seller.type === 'independent',
);
