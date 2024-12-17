import { useMemo } from 'react';
import { PropertyDataType } from '../types/propertyTypes';

export const useSortedProperties = (
  properties: PropertyDataType[],
  sortParam: string,
  sortOrder: 'asc' | 'desc'
) => {
  return useMemo(() => {
    const order = sortOrder === 'asc' ? 1 : -1;

    return [...properties].sort((a, b) => {
      switch (sortParam) {
        case 'price':
          return (a.price - b.price) * order;
        case 'bed':
          return (a.bed - b.bed) * order;
        case 'bath':
          return (a.bath - b.bath) * order;
        case 'sqft':
          return (a.sqft - b.sqft) * order;
        default:
          return 0;
      }
    });
  }, [properties, sortParam, sortOrder]);
};
