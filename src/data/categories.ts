import { Apple, BookOpen, HeartPulse, House, Package, Shirt, Smartphone, Sparkles, Sprout, Wrench } from 'lucide-react';
import type { Category, Subcategory } from '@/types/marketplace';

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: { en: 'Electronics', prs: 'لوازم الکترونیکی' },
    description: { en: 'Phones, audio, and computers', prs: 'موبایل، صوت و کامپیوتر' },
    icon: Smartphone,
  },
  {
    id: 'clothing',
    name: { en: 'Clothing', prs: 'پوشاک' },
    description: { en: 'Everyday and formal wear', prs: 'پوشاک روزمره و رسمی' },
    icon: Shirt,
  },
  {
    id: 'home-kitchen',
    name: { en: 'Home & Kitchen', prs: 'خانه و آشپزخانه' },
    description: { en: 'Cookware and home decor', prs: 'ظروف پخت‌وپز و دکور خانه' },
    icon: House,
  },
  {
    id: 'beauty',
    name: { en: 'Beauty', prs: 'زیبایی' },
    description: { en: 'Skincare and fragrance', prs: 'مراقبت پوست و عطر' },
    icon: Sparkles,
  },
  {
    id: 'health',
    name: { en: 'Health', prs: 'صحت' },
    description: { en: 'Vitamins and wellness', prs: 'ویتامین و سلامتی' },
    icon: HeartPulse,
  },
  {
    id: 'agriculture',
    name: { en: 'Agriculture', prs: 'زراعت' },
    description: { en: 'Seeds, produce, and supplies', prs: 'بذر، محصولات زراعتی و لوازم' },
    icon: Sprout,
  },
  {
    id: 'food',
    name: { en: 'Food', prs: 'خوراکی' },
    description: { en: 'Spices and snacks', prs: 'ادویه و خوراکی‌ها' },
    icon: Apple,
  },
  {
    id: 'books',
    name: { en: 'Books', prs: 'کتاب' },
    description: { en: 'Study and reading', prs: 'درسی و مطالعه' },
    icon: BookOpen,
  },
  {
    id: 'tools',
    name: { en: 'Tools', prs: 'ابزار' },
    description: { en: 'Hand tools and repair kits', prs: 'ابزار دستی و کیت تعمیر' },
    icon: Wrench,
  },
  {
    id: 'other',
    name: { en: 'Other', prs: 'سایر' },
    description: { en: 'Gifts and more', prs: 'هدیه و موارد دیگر' },
    icon: Package,
  },
];

export const CATEGORY_SUBCATEGORY_SEEDS: Record<string, Subcategory[]> = {
  electronics: [
    { id: 'phones', name: { en: 'Phones', prs: 'موبایل' }, active: true },
    { id: 'audio', name: { en: 'Audio', prs: 'صوت' }, active: true },
  ],
  clothing: [
    { id: 'men', name: { en: 'Men', prs: 'مردانه' }, active: true },
    { id: 'women', name: { en: 'Women', prs: 'زنانه' }, active: true },
  ],
  'home-kitchen': [
    { id: 'cookware', name: { en: 'Cookware', prs: 'ظروف پخت‌وپز' }, active: true },
    { id: 'home-decor', name: { en: 'Home decor', prs: 'دکور خانه' }, active: true },
  ],
  beauty: [
    { id: 'skincare', name: { en: 'Skincare', prs: 'مراقبت پوست' }, active: true },
    { id: 'fragrance', name: { en: 'Fragrance', prs: 'عطر' }, active: true },
  ],
  health: [
    { id: 'vitamins', name: { en: 'Vitamins', prs: 'ویتامین' }, active: true },
    { id: 'wellness', name: { en: 'Wellness', prs: 'سلامتی' }, active: true },
  ],
  agriculture: [
    { id: 'seeds', name: { en: 'Seeds', prs: 'بذر' }, active: true },
    { id: 'produce', name: { en: 'Produce', prs: 'محصولات زراعتی' }, active: true },
  ],
  food: [
    { id: 'spices', name: { en: 'Spices', prs: 'ادویه' }, active: true },
    { id: 'snacks', name: { en: 'Snacks', prs: 'خوراکی‌ها' }, active: true },
  ],
  books: [
    { id: 'study', name: { en: 'Study books', prs: 'کتاب‌های درسی' }, active: true },
    { id: 'reading', name: { en: 'Reading', prs: 'مطالعه' }, active: true },
  ],
  tools: [
    { id: 'hand-tools', name: { en: 'Hand tools', prs: 'ابزار دستی' }, active: true },
    { id: 'repair-kits', name: { en: 'Repair kits', prs: 'کیت تعمیر' }, active: true },
  ],
  other: [
    { id: 'gifts', name: { en: 'Gifts', prs: 'هدیه' }, active: true },
    { id: 'gift-boxes', name: { en: 'Gift boxes', prs: 'جعبه هدیه' }, active: true },
  ],
};
