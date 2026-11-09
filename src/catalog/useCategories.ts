import { useContext } from 'react';
import { CategoryContext } from './categoryContext';

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used inside CategoryProvider');
  return context;
}
