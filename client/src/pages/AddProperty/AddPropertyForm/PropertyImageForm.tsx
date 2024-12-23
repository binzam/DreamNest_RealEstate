import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
interface PropertyLocationFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}
const PropertyImageForm: React.FC<PropertyLocationFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <fieldset>
      <legend>Property Images</legend>
      <div className="pty_img_upload">
        <div className="add_form_group">
          <label htmlFor="image">
            Upload atleast 4 images of your property
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyImageForm;
