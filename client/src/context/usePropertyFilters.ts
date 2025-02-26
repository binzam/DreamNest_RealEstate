import { useContext } from 'react';
import { PropertyFilterContext } from './PropertyFilterContext';

export const usePropertyFilters = () => {
  const context = useContext(PropertyFilterContext);
  if (!context) {
    throw new Error(
      'usePropertyFilters must be used within a PropertyFilterProvider'
    );
  }
  return context;
};
