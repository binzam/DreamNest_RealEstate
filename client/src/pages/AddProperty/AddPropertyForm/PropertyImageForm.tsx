import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
import { FaUpload, FaXmark } from 'react-icons/fa6';
interface PropertyImageFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}
const PropertyImageForm: React.FC<PropertyImageFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files) {
      const updatedPhotos = [...formData.photos];
      const newImage = files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPhotos[index] = {
          ...updatedPhotos[index],
          image: reader.result as string,
        };
        setFormData({
          ...formData,
          photos: updatedPhotos,
        });
      };
      reader.readAsDataURL(newImage);
    } else if (name === 'title') {
      const updatedPhotos = [...formData.photos];
      updatedPhotos[index] = { ...updatedPhotos[index], title: value };

      setFormData({
        ...formData,
        photos: updatedPhotos,
      });
    }
  };

  const handleAddPhoto = () => {
    setFormData({
      ...formData,
      photos: [...formData.photos, { title: '', image: '' }],
    });
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  return (
    <fieldset>
      <legend>Property Images</legend>
      <div className="pty_img_upload">
        <div className="add_form_group">
          <label>Upload at least 4 images of your property</label>
          <div className="add_imgs_inputs">
            <div className="photo_entry">
              <div className="add_form_group">
                <label htmlFor="title" className="pty_photo_title">
                  Main Photo (Thumbnail)
                </label>
              </div>
              <div className="add_form_group">
                <label htmlFor="mainPhoto" className="pty_img_upload_label">
                  <FaUpload /> Click to{' '}
                  {formData.image ? 'Change Image' : 'Choose Image'}
                </label>
                <input
                  type="file"
                  id="mainPhoto"
                  name="image"
                  // onChange={handleMainImageChange}
                  accept="image/*"
                  required
                />
                {formData.image && (
                  <div className="pty_img_preview">
                    <img src={formData.image} alt={`Main  preview`} />
                  </div>
                )}
              </div>
              {formData.image && (
                <button
                  type="button"
                  className="remove_photo_btn"
                  // onClick={handleRemoveMainPhoto}
                >
                  <FaXmark /> Remove Photo
                </button>
              )}
            </div>
            {formData.photos.map((photo, index) => (
              <div key={index} className="photo_entry">
                <div className="add_form_group">
                  <label htmlFor={`title-${index}`} className="pty_photo_title">
                    {photo.title ? (
                      <strong>{photo.title}</strong>
                    ) : (
                      'Photo Title'
                    )}
                  </label>
                  <input
                    className="wide_rounded_input"
                    type="text"
                    id={`title-${index}`}
                    name="title"
                    value={photo.title}
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder="Example: Living Room, Bedroom 1, Backyard etc."
                    required
                  />
                </div>
                <div className="add_form_group">
                  <label
                    htmlFor={`image-${index}`}
                    className="pty_img_upload_label"
                  >
                    <FaUpload /> Click to{' '}
                    {photo.image ? 'Change Image' : 'Choose Image'}
                  </label>
                  <input
                    type="file"
                    id={`image-${index}`}
                    name="image"
                    onChange={(e) => handleImageChange(index, e)}
                    accept="image/*"
                    required
                  />
                  {photo.image && (
                    <div className="pty_img_preview">
                      <img
                        src={photo.image}
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
          <button
            type="button"
            className="add_more_photos_btn"
            onClick={handleAddPhoto}
          >
            Add More Photos
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyImageForm;
