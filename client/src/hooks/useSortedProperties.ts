import { useMemo } from 'react';
import { PropertyDataType } from '../types/propertyTypes';

export const useSortedProperties = (
  properties: PropertyDataType[],
  sortParam: string,
  sortOrder: 'asc' | 'desc'
) => {
  return useMemo(() => {
    if (!properties || properties.length === 0) return [];
    const order = sortOrder === 'asc' ? 1 : -1;

    return [...properties].sort((a, b) => {
      // switch (sortParam) {
      //   case 'price':
      //     return (a.price - b.price) * order;
      //   case 'bed':
      //     return (a.bed - b.bed) * order;
      //   case 'bath':
      //     return (a.bath - b.bath) * order;
      //   case 'sqft':
      //     return (a.sqft - b.sqft) * order;
      //   default:
      //     return 0;
      // }
      const valueA = a[sortParam as keyof PropertyDataType];
      const valueB = b[sortParam as keyof PropertyDataType];

      if (valueA == null || valueB == null) return 0;

      return (Number(valueA) - Number(valueB)) * order;
    });
  }, [properties, sortParam, sortOrder]);
};
