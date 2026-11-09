import { createContext } from 'react';
import type { CategoryManagementRecord } from '@/types/admin';
import type { LocalizedText, Subcategory } from '@/types/marketplace';

export interface CategoryDraft {
  name: LocalizedText;
  description: LocalizedText;
  subcategories: Subcategory[];
}

export interface CategoryContextValue {
  categories: CategoryManagementRecord[];
  activeCategories: CategoryManagementRecord[];
  getCategory: (id: string) => CategoryManagementRecord | undefined;
  addCategory: (draft: CategoryDraft) => string;
  updateCategory: (id: string, draft: CategoryDraft) => void;
  setCategoryActive: (id: string, active: boolean) => void;
  moveCategory: (id: string, direction: -1 | 1) => void;
}

export const CategoryContext = createContext<CategoryContextValue | null>(null);
