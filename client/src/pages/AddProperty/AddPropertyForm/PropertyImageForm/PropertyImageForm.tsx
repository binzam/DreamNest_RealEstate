import React from 'react';
import { FaUpload, FaXmark } from 'react-icons/fa6';
import './PropertyImageForm.css';
import ErrorDisplay from '../../../../components/ErrorDisplay/ErrorDisplay';
import ValidationError from '../ValidationError';
interface PropertyImageFormProps {
  formData: {
    photos: { title: string; image: File | null; previewUrl?: string }[];
  };

  updateFormData: (
    newData: Partial<{
      photos: { title: string; image: File | null; previewUrl?: string }[];
    }>
  ) => void;
  validationErrors: Record<string, string>;
}

const PropertyImageForm: React.FC<PropertyImageFormProps> = ({
  formData,
  updateFormData,
  validationErrors,
}) => {
  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const updatedPhotos = formData.photos.map((photo, i) =>
        i === index
          ? {
              ...photo,
              [name]: files[0],
              previewUrl: URL.createObjectURL(files[0]),
            }
          : photo
      );
      updateFormData({ photos: updatedPhotos });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = formData.photos.map((photo, i) =>
      i === index ? { ...photo, image: null, previewUrl: '' } : photo
    );
    updateFormData({ photos: updatedPhotos });
  };

  const handleAddPhoto = () => {
    const newPhotos = [
      ...formData.photos,
      { title: '', image: null, previewUrl: '' },
    ];
    updateFormData({ photos: newPhotos });
  };
  const handleTitleChange = (index: number, value: string) => {
    const updatedPhotos = formData.photos.map((photo, i) =>
      i === index ? { ...photo, title: value } : photo
    );
    updateFormData({ photos: updatedPhotos });
  };
  return (
    <fieldset>
      <legend className="field_title">Property Images{validationErrors.photos && <ValidationError />}</legend>
      <div className="pty_img_upload">
        
        <div className="pty_img_hdr">
          <label>
            Upload <strong>at least 4</strong> images of the property
          </label>
          <small>
            Please provide a descriptive title for each Image. <br /> Example:
            "Bedroom 1", "Front", "Side"...
          </small>
        </div>
        <div className="add_imgs_inputs">
          {formData.photos.map((photo, index) => (
            <div key={index} className="photo_entry">
              <div className="photo_entry_top">
                <label htmlFor={`title-${index}`}>
                  {photo.title ? (
                    <strong>
                      {photo.title === 'Main'
                        ? 'Main Photo (Thumbnail)'
                        : photo.title}
                    </strong>
                  ) : (
                    'Title'
                  )}
                </label>
                <input
                  className="rounded_input_img_ttl"
                  type="text"
                  id={`title-${index}`}
                  name="title"
                  value={photo.title}
                  readOnly={photo.title === 'Main'}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  placeholder="Write title"
                />
              </div>
              <div className="photo_entry_top_btm">
                <label
                  htmlFor={`image-${index}`}
                  className={`pty_img_upload_label ${
                    photo.image ? 'selected' : ''
                  }`}
                >
                  <FaUpload /> Click to{' '}
                  {photo.image ? 'Change Image' : 'Choose Image'}
                </label>
                <input
                  className="pty_img_file_input"
                  type="file"
                  id={`image-${index}`}
                  name="image"
                  onChange={(e) => handleImageChange(index, e)}
                  accept="image/*"
                />
                {photo.previewUrl && (
                  <div className="pty_img_preview">
                    <img
                      src={photo.previewUrl}
                      alt={`Image ${index + 1} preview`}
                    />
                  </div>
                )}
              </div>
              {photo.image && (
                <button
                  type="button"
                  className="remove_photo_btn"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <FaXmark /> Remove Photo
                </button>
              )}
            </div>
          ))}
        </div>
        {/* <button
            type="button"
            className="add_more_photos_btn"
            onClick={handleAddPhoto}
            disabled={formData.photos.length >= 8}
          >
            Add More Photos
          </button> */}
        {formData.photos.length === 5 && formData.photos.length < 8 && (
          <button
            type="button"
            className="add_more_photos_btn"
            onClick={handleAddPhoto}
          >
            Add More Photos
          </button>
        )}
      </div>
      {validationErrors.photos && (
        <ErrorDisplay message={validationErrors.photos} />
      )}
      {Object.keys(validationErrors).some(
        (key) => key !== 'photos' && validationErrors[key]
      ) && (
        <ErrorDisplay message="Please go back and fill all required fields." />
      )}
    </fieldset>
  );
};

export default PropertyImageForm;
