import React from 'react'; // , { useState }
import { FaUpload, FaXmark } from 'react-icons/fa6';

interface PropertyImageFormProps {
  formData: {
    photos: { title: string; image: File | null; previewUrl: string }[];
  };

  updateFormData: (
    newData: Partial<{
      photos: { title: string; image: File | null; previewUrl: string }[];
    }>
  ) => void;
}

const PropertyImageForm: React.FC<PropertyImageFormProps> = ({
  formData,
  updateFormData,
}) => {
  // const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);

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

      // const updatedPreviewPhotos = [...previewPhotos];
      // updatedPreviewPhotos[index] = URL.createObjectURL(files[0]);
      // setPreviewPhotos(updatedPreviewPhotos);
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
      <legend>Property Images</legend>
      <div className="pty_img_upload">
        <div className="add_form_group">
          <label>Upload at least 4 images of your property</label>
          <small className='add_pty_sml_txt'>
            Please provide a descriptive title for each Image. <br /> Example:
            "Bedroom 1", "Front", "Side"...
          </small>
          <div className="add_imgs_inputs">
            {formData.photos.map((photo, index) => (
              <div key={index} className="photo_entry">
                <div className="add_form_group">
                  <label htmlFor={`title-${index}`} className="pty_photo_title">
                    {photo.title ? (
                      <strong>
                        {photo.title === 'Main'
                          ? 'Main Photo (Thumbnail)'
                          : photo.title}
                      </strong>
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
                    readOnly={photo.title === 'Main'}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    placeholder="Example: Living Room, Bedroom 1, Backyard, etc."
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
                    className="file_input"
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
      </div>
    </fieldset>
  );
};

export default PropertyImageForm;
