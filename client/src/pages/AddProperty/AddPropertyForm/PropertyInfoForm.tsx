import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
interface PropertyLocationFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}
const PropertyInfoForm: React.FC<PropertyLocationFormProps> = ({
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
      <legend>Property Lisitng Information</legend>
      <div className="pty_name_detail">
        <div className="add_form_group">
          <label htmlFor="name">Write a short title for your property?

          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='example: "3 bedroom apartment"'
            required
          />
        </div>
        <div className="add_form_group">
          <label htmlFor="detail">Write a good description of the your property</label>
          <input
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add_form_group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyInfoForm;
