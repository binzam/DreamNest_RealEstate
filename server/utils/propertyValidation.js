import Joi from 'joi';

export const validatePropertyData = (data, files) => {
  console.log('data---', data);
  console.log('FILES---', files);

  // Schema for photos
  const photosSchema = Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
      })
    )
    .min(1)
    .required();

  // Schema for main property fields
  const propertySchema = Joi.object({
    title: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().optional(),
      country: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }).required(),
    price: Joi.number().min(0).required(),
    bed: Joi.number().min(0).required(),
    bath: Joi.number().min(0).required(),
    sqft: Joi.number().min(0).required(),
    detail: Joi.string().required(),
    propertyFor: Joi.string().valid('sale', 'rent').required(),
    propertyType: Joi.string().required(),
    yearBuilt: Joi.number().min(1800).max(new Date().getFullYear()).required(),
    discount: Joi.number().min(0).max(100).optional(),
    currency: Joi.string().required(),
    isAvailable: Joi.boolean().required(),
    tempPropertyId: Joi.string().required(),
  });

  // Validate main property data (excluding photos)
  const { error: propertyError, value: validatedPropertyData } =
    propertySchema.validate(data, {
      abortEarly: false,
      allowUnknown: true, // Allow dynamic photo fields
    });

  if (propertyError) {
    return {
      isValid: false,
      errors: propertyError.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    };
  }

  // Extract and validate photos
  const photos = files.map((file, index) => {
    const titleKey = `photos${index}`; // Key for the photo title object
    const titleObject = data[titleKey]; // Access the object ({ title: 'photo-title' })
    if (!titleObject || !titleObject.title) {
      throw new Error(`Missing title for photo at index ${index}`);
    }

    return { title: titleObject.title, image: file.filename };
  });

  const { error: photosError } = photosSchema.validate(photos);

  if (photosError) {
    return {
      isValid: false,
      errors: photosError.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    };
  }

  // Combine validated data
  return { isValid: true, value: { ...validatedPropertyData, photos } };
};
