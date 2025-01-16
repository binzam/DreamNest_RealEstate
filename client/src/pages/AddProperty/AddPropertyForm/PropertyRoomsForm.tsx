import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa6';
interface PropertyRoomsFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}
const PropertyRoomsForm: React.FC<PropertyRoomsFormProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: name !== 'sizeUnit' ? Number(value) : value,
    });
  };
  return (
    <fieldset>
     
      <legend>Property Size & Rooms</legend>
      <div className="bed_bath_sqft_inputs">
        <small className='add_pty_sml_txt'>Please give accurate values.</small>
        <div className="add_pty_size_inputs">
          <div  className="add_pty_size_input">
            <div className="add_form_group">
              <label htmlFor="bed">
                <FaBed />
                Bedrooms
              </label>
              <input
                className="wide_rounded_input"
                type="number"
                id="bed"
                name="bed"
                value={formData.bed !== 0 ? formData.bed : ''}
                onChange={handleChange}
                required
                min="1"
                placeholder="number of bedrooms"
              />
            </div>

            <div className="add_form_group">
              <label htmlFor="bath">
                <FaBath /> Bathrooms
              </label>
              <input
                className="wide_rounded_input"
                type="number"
                id="bath"
                name="bath"
                value={formData.bath !== 0 ? formData.bath : ''}
                onChange={handleChange}
                required
                placeholder="number of bathrooms"
                min="1"
              />
            </div>
          </div>
          <div className="add_pty_size_input">
            <div className="add_form_group">
              <label htmlFor="sqft">
                <FaRulerCombined />
                Size of Property
              </label>
              <input
                className="wide_rounded_input"
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft !== 0 ? formData.sqft : ''}
                onChange={handleChange}
                required
                min="0"
                placeholder="sqft, sqm"
              />
            </div>
            <div className="add_form_group">
              <label htmlFor="sizeUnit">Measurement Unit</label>
              <select
                id="sizeUnit"
                className="add_pty_unit_select"
                name="sizeUnit"
                value={formData.sizeUnit || 'sqft'}
                onChange={handleChange}
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meters</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyRoomsForm;
