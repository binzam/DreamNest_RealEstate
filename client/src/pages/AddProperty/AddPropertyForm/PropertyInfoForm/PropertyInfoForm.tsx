import React from 'react';
import { PropertyFormData } from '../../../../types/propertyTypes';
import './PropertyInfoForm.css';
import ValidationError from '../ValidationError';
interface PropertyInfoFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  validationErrors: Record<string, string>;
}

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({
  formData,
  updateFormData,
  validationErrors,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      updateFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      updateFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  return (
    <fieldset>
      <legend className="field_title">
        Property Lisitng Information{' '}
        {(validationErrors.title ||
          validationErrors.yearBuilt ||
          validationErrors.detail ||
          validationErrors.price) && <ValidationError />}
      </legend>
      <div className="pty_detail_inputs">
        <div className="pty_details_input_row">
          <div className="pty_details_col">
            <div className="pty_info_wrap">
              <label htmlFor="title" className="pty_ttl_label">
                Short title for the property.
                <br />
                <small>Make it short and descriptive.</small>
              </label>
              <input
                className={`rounded_input ${
                  validationErrors.title ? 'error' : ''
                }`}
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder='example: "3 bedroom apartment with a beautiful view"'
                required
              />
            </div>
            <div className="pty_info_wrap half">
              <label htmlFor="yearBuilt">
                What year was the property built?
              </label>
              <input
                className={`rounded_input ${
                  validationErrors.yearBuilt ? 'error' : ''
                }`}
                type="number"
                id="yearBuilt"
                name="yearBuilt"
                value={formData.yearBuilt !== null ? formData.yearBuilt : ''}
                onChange={handleChange}
                placeholder="Year built"
                required
              />
            </div>
          </div>
          <div className="pty_details_col">
            <div className="pty_info_wrap">
              <label htmlFor="detail" className="pty_ttl_label">
                Detailed description of the property.
              </label>
              <textarea
                className={`pty_desc_textarea ${
                  validationErrors.price ? 'error' : ''
                }`}
                id="detail"
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder='example: "The house has 4 bedrooms and 2 bathrooms with ample rental potential. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room..."'
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className="pty_details_input_row second">
          <div className="pty_info_wrap half">
            <label htmlFor="price" className="price">
              {formData.propertyFor === 'sale'
                ? 'Total price'
                : 'Price per month'}
            </label>
            <input
              className={`rounded_input ${
                validationErrors.price ? 'error' : ''
              }`}
              type="number"
              id="price"
              name="price"
              value={formData.price !== null ? formData.price : ''}
              onChange={handleChange}
              placeholder={
                formData.propertyFor === 'sale' ? 'total price' : 'monthly rent'
              }
              required
            />
          </div>
          <div className="pty_info_wrap half">
            <label htmlFor="currency" className="price">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="add_pty_currncy_select"
              value={formData.currency || 'USD'}
              onChange={handleChange}
              required
            >
              <option value="">Select Currecy</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </div>
        </div>
        <div className="pty_info_wrap checkbox">
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={formData.isAvailable || false}
            onChange={handleChange}
          />
          <div className="pty_info_wrap_hdr">
            <label htmlFor="isAvailable">
              Is the property available for {formData.propertyFor} at this
              moment?
            </label>
            <small>Only Available properties are visible to viewers.</small>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyInfoForm;
