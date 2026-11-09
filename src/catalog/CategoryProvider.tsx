import { useMemo, useState, type ReactNode } from 'react';
import { Package } from 'lucide-react';
import { CATEGORIES, CATEGORY_SUBCATEGORY_SEEDS } from '@/data/categories';
import { makeUniqueSlug } from '@/lib/ids';
import type { CategoryManagementRecord } from '@/types/admin';
import type { Subcategory } from '@/types/marketplace';
import { CategoryContext, type CategoryContextValue, type CategoryDraft } from './categoryContext';

const SEED_RECORDS: CategoryManagementRecord[] = CATEGORIES.map((category, index) => ({
  ...category,
  displayOrder: index + 1,
  active: true,
  subcategories: CATEGORY_SUBCATEGORY_SEEDS[category.id] ?? [],
}));

function sortByOrder(records: CategoryManagementRecord[]): CategoryManagementRecord[] {
  return [...records].sort((a, b) => a.displayOrder - b.displayOrder);
}

function resolveSubcategories(drafts: Subcategory[], existing: Subcategory[]): Subcategory[] {
  const taken = [...existing.map((item) => item.id), ...drafts.filter((item) => item.id).map((item) => item.id)];
  return drafts.map((draft) => {
    if (draft.id) return draft;
    const id = makeUniqueSlug(draft.name.en, taken);
    taken.push(id);
    return { ...draft, id };
  });
}

export default function CategoryProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<CategoryManagementRecord[]>(SEED_RECORDS);

  const value = useMemo<CategoryContextValue>(() => {
    const categories = sortByOrder(records);
    return {
      categories,
      activeCategories: categories.filter((category) => category.active),
      getCategory: (id) => records.find((category) => category.id === id),
      addCategory: (draft: CategoryDraft) => {
        const id = makeUniqueSlug(draft.name.en, records.map((category) => category.id));
        setRecords((current) => [
          ...current,
          {
            id,
            name: draft.name,
            description: draft.description,
            icon: Package,
            displayOrder: current.length + 1,
            active: true,
            subcategories: resolveSubcategories(draft.subcategories, []),
          },
        ]);
        return id;
      },
      updateCategory: (id, draft) =>
        setRecords((current) =>
          current.map((category) =>
            category.id === id
              ? {
                  ...category,
                  name: draft.name,
                  description: draft.description,
                  subcategories: resolveSubcategories(draft.subcategories, category.subcategories),
                }
              : category,
          ),
        ),
      setCategoryActive: (id, active) =>
        setRecords((current) => current.map((category) => (category.id === id ? { ...category, active } : category))),
      moveCategory: (id, direction) =>
        setRecords((current) => {
          const ordered = sortByOrder(current);
          const index = ordered.findIndex((category) => category.id === id);
          const target = index + direction;
          if (index < 0 || target < 0 || target >= ordered.length) return current;
          [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
          return ordered.map((category, position) => ({ ...category, displayOrder: position + 1 }));
        }),
    };
  }, [records]);

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
