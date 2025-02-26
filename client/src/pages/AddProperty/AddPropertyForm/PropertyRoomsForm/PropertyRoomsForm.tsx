import React from 'react';
import { PropertyFormData } from '../../../../types/propertyTypes';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa6';
import './PropertyRoomsForm.css';
import ValidationError from '../ValidationError';
interface PropertyRoomsFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  validationErrors: Record<string, string>;
}
const PropertyRoomsForm: React.FC<PropertyRoomsFormProps> = ({
  formData,
  updateFormData,
  validationErrors,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? null : Number(value);
    updateFormData({
      [name]: name !== 'sizeUnit' ? parsedValue : value,
    });
  };
  return (
    <fieldset>
      <legend className="field_title">
        Property Size & Rooms{' '}
        {(validationErrors.bed ||
          validationErrors.bath ||
          validationErrors.sqft) && <ValidationError />}
      </legend>
      <div className="bed_bath_sqft_inputs">
        <p>Please give accurate values.</p>
        <div className="add_pty_size_inputs">
          <div className="add_pty_size_input">
            <div className="size_input_grp">
              <label htmlFor="bed">
                <FaBed />
                Bedrooms
              </label>
              <input
                className={`rounded_input ${
                  validationErrors.bed ? 'error' : ''
                }`}
                type="number"
                id="bed"
                name="bed"
                value={formData.bed !== null ? formData.bed : ''}
                onChange={handleChange}
                required
                placeholder="number of bed"
                min={0}
              />
            </div>

            <div className="size_input_grp">
              <label htmlFor="bath">
                <FaBath /> Bathrooms
              </label>
              <input
                className={`rounded_input ${
                  validationErrors.bath ? 'error' : ''
                }`}
                type="number"
                id="bath"
                name="bath"
                value={formData.bath !== null ? formData.bath : ''}
                onChange={handleChange}
                required
                placeholder="number of bath"
                min={0}
              />
            </div>
          </div>
          <div className="add_pty_size_input">
            <div className="size_input_grp">
              <label htmlFor="sqft">
                <FaRulerCombined />
                Size of Property
              </label>
              <input
                className={`rounded_input ${
                  validationErrors.sqft ? 'error' : ''
                }`}
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft !== null ? formData.sqft : ''}
                onChange={handleChange}
                required
                placeholder="sqft, sqm"
                min={1}
              />
            </div>
            <div className="size_input_grp">
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
