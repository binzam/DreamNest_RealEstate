import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa6';
interface PropertyRoomsFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}
const PropertyRoomsForm: React.FC<PropertyRoomsFormProps> = ({
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
      <legend>Property Size</legend>
      <div className="bed_bath_sqft_inputs">
        <small>Please give accurate values.</small>
        <div className="add_pty_size_inputs">
          <div className="add_form_group">
            <label htmlFor="bed"><FaBed />Bedrooms</label>
            <input
            className='wide_rounded_input'
              type="number"
              id="bed"
              name="bed"
              value={formData.bed !== null ? formData.bed : ''}
              onChange={handleChange}
              required
              min="1"
              placeholder='Number of bedrooms'
            />
          </div>

          <div className="add_form_group">
            <label htmlFor="bath"><FaBath /> Bathrooms</label>
            <input
            className='wide_rounded_input'
              type="number"
              id="bath"
              name="bath"
              value={formData.bath !== null ? formData.bath : ''}
              onChange={handleChange}
              required
              placeholder='Number of bathrooms'
              min="1"
            />
          </div>

          <div className="add_form_group">
            <label htmlFor="sqft"><FaRulerCombined />Total Square Footage</label>
            <input
            className='wide_rounded_input'
              type="number"
              id="sqft"
              name="sqft"
              value={formData.sqft !== null ? formData.sqft : ''}
              onChange={handleChange}
              required
              min="0"
              placeholder='square footage'
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyRoomsForm;
