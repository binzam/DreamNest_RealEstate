import { useQuery } from '@tanstack/react-query';
import { CategorizedProperty, PropertyDataType } from '../types/propertyTypes';
import { PropertyLocation } from '../types/interface';
import {
  fetchCategorizedProperties,
  fetchFeaturedProperties,
  fetchProperties,
  fetchPropertyById,
  fetchTopProperties,
} from '../api/fetchData';

export const useFetchProperties = () => {
  return useQuery<PropertyDataType[], Error>({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
};
export const useFetchFeaturedProperties = () => {
  return useQuery<PropertyDataType[], Error>({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
  });
};
export const useFetchCategorizedProperties = () => {
  return useQuery<CategorizedProperty[], Error>({
    queryKey: ['categorizedProperties'],
    queryFn: fetchCategorizedProperties,
  });
};

export const useFetchPropertyById = (id: string) => {
  return useQuery<PropertyDataType, Error>({
    queryKey: ['property', id],
    queryFn: fetchPropertyById,
    enabled: !!id,
  });
};

export const useFetchLocations = () => {
  return useQuery<
    {
      properties: PropertyLocation[];
      center: [number, number];
    },
    Error
  >({
    queryKey: ['topLocations'],
    queryFn: fetchTopProperties,
  });
};
