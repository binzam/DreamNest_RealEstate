import { useMemo } from 'react';
import { PropertyDataType } from '../types';

export const useFilteredProperties = (
  properties: PropertyDataType[],
  type: string | undefined
) => {
  const propertyCategories = ['sale', 'rent'];
  const isCategory = propertyCategories.includes(type || '');

  return useMemo(() => {
    return properties.filter((property) =>
      isCategory ? property.propertyFor === type : true
    );
  }, [type, isCategory, properties]);
};
