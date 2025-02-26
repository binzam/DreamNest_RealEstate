import { PropertyFormData } from '../types/propertyTypes';
export const getStepErrors = (step: number, validationErrors: Record<string, string>): boolean => {
  switch (step) {
    case 1: // Property Details
      return !!(validationErrors.propertyType || validationErrors.propertyFor);
    case 2: // Property Location
      return !!(
        validationErrors['address.street'] ||
        validationErrors['address.state'] ||
        validationErrors['address.city'] ||
        validationErrors['address.country']
      );
    case 3: // Property Rooms
      return !!(
        validationErrors.bed ||
        validationErrors.bath ||
        validationErrors.sqft
      );
    case 4: // Property Info
      return !!(
        validationErrors.title ||
        validationErrors.detail ||
        validationErrors.yearBuilt ||
        validationErrors.currency
      );
    case 5: // Property Images
      return !!validationErrors.photos;
    default:
      return false;
  }
};
export const createPropertyFormData = (
  formData: PropertyFormData
): FormData => {
  const formDataWithFiles = new FormData();

  formDataWithFiles.append('title', formData.title);
  formDataWithFiles.append('address[street]', formData.address.street);
  formDataWithFiles.append('address[city]', formData.address.city);
  formDataWithFiles.append('address[state]', formData.address.state);
  formDataWithFiles.append('address[country]', formData.address.country);
  formDataWithFiles.append(
    'address[latitude]',
    formData.address.latitude.toString()
  );
  formDataWithFiles.append(
    'address[longitude]',
    formData.address.longitude.toString()
  );
  formDataWithFiles.append(
    'price',
    formData.price !== null ? formData.price.toString() : ''
  );
  formDataWithFiles.append(
    'bed',
    formData.bed !== null ? formData.bed.toString() : ''
  );
  formDataWithFiles.append(
    'bath',
    formData.bath !== null ? formData.bath.toString() : ''
  );
  formDataWithFiles.append(
    'sqft',
    formData.sqft !== null ? formData.sqft.toString() : ''
  );
  formDataWithFiles.append('propertyFor', formData.propertyFor);
  formDataWithFiles.append('propertyType', formData.propertyType);
  formDataWithFiles.append('detail', formData.detail);
  formDataWithFiles.append(
    'yearBuilt',
    formData.yearBuilt !== null ? formData.yearBuilt.toString() : ''
  );

  if (formData.currency) {
    formDataWithFiles.append('currency', formData.currency);
  }

  formDataWithFiles.append('isAvailable', formData.isAvailable.toString());

  if (formData.tempPropertyId) {
    formDataWithFiles.append('tempPropertyId', formData.tempPropertyId);
  }

  formData.photos.forEach((photo, index) => {
    if (photo.image) {
      formDataWithFiles.append(`photos${index}[title]`, photo.title);
      formDataWithFiles.append('photos', photo.image);
    }
  });

  return formDataWithFiles;
};
