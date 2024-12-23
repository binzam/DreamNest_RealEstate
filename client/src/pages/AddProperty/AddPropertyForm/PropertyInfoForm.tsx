import React from 'react';
import { PropertyFormData } from '../../../types/propertyTypes';
interface PropertyInfoFormProps {
  formData: PropertyFormData;
  setFormData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
}
const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  return (
    <fieldset>
      <legend>Property Lisitng Information</legend>
      <div className="pty_ttl_detail_inputs">
        <div className="add_form_group">
          <label htmlFor="name" className="pty_ttl_label">
            Write a short title for your property.
            <br />
            <small>Make the title short and descriptive for the viewers.</small>
          </label>
          <input
            className="wide_rounded_input"
            type="text"
            id="name"
            name="name"
            value={formData.title}
            onChange={handleChange}
            placeholder='example: "3 bedroom apartment with a beautiful view"'
            required
          />
        </div>
        <div className="add_form_group">
          <label htmlFor="detail" className="pty_ttl_label">
            Write a good description of your property.
          </label>
          <textarea
            className="wide_textarea"
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            placeholder='example: "The house has 4 bedrooms and 2 bathrooms with ample rental potential. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room..."'
            required
          ></textarea>
        </div>
        <div className="pty_year_price">
          <div className="add_form_group">
            <label htmlFor="yearBuilt">What year was the property built?</label>
            <input
              className="wide_rounded_input"
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder="Year built"
              required
            />
          </div>
          <div className="add_price_curncy">
            <div className="add_form_group_split">
              <label htmlFor="price">Property Price</label>
              <input
                className="wide_rounded_input"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Asking price"
                required
              />
            </div>
            <div className="add_form_group_split col">
              <select
                id="currency"
                name="currency"
                className="add_pty_select"
                value={formData.currency || 'USD'}
                onChange={handleChange}
                required
              >
                <option value="">Select Currecy</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
          </div>

          <div className="add_form_group">
            <label htmlFor="isAvailable">
              Is this property available at this moment?
            </label>
            <input
              className=""
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable || false}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyInfoForm;
