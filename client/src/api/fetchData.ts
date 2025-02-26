import { PropertyLocation } from '../types/interface';
import { CategorizedProperty, PropertyDataType } from '../types/propertyTypes';
import { axiosPrivate, axiosPublic } from './axiosInstance';

export const fetchProperties = async (): Promise<PropertyDataType[]> => {
  const response = await axiosPrivate.get(`/properties/list`);
  // console.log('PROPERTIES API CALL', response);

  return response.data;
};

export const fetchPropertyById = async (context: { queryKey: readonly unknown[] }): Promise<PropertyDataType> => {

  const [, id] = context.queryKey as [string, string];

  const response = await axiosPrivate.get(`/properties/list/${id}`);
  // console.log('fetchPropertyById API CALL', response);
  return response.data;

};


export const fetchTopProperties = async (): Promise<{
  properties: PropertyLocation[];
  center: [number, number];
}> => {
  const response = await axiosPublic.get('/properties/top-locations');
  console.log('fetchTopProperties called', response);
  return response.data;
};

export const fetchFeaturedProperties = async (): Promise<
  PropertyDataType[]
> => {
  const response = await axiosPublic.get(`/properties/featured`);
  // console.log('fetchFeaturedProperties API CALL', response);
  return response.data;
};

export const fetchCategorizedProperties = async (): Promise<
  CategorizedProperty[]
> => {
  const response = await axiosPrivate.get('/properties/list/categorized');
  console.log('fetchCategorizedProperties API CALL', response);
  return response.data;
};
