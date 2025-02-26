import { MdCabin, MdTerrain, MdVilla } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { FaTrailer } from 'react-icons/fa6';
import { PropertyFormData } from '../../../../types/propertyTypes';
import './PropertyDetailForm.css';
import ValidationError from '../ValidationError';
interface PropertyDetailFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  validationErrors: Record<string, string>;
}

const PropertyDetailForm: React.FC<PropertyDetailFormProps> = ({
  formData,
  updateFormData,
  validationErrors,
}) => {
  const propertyTypes = [
    { title: 'House', icon: <HiHomeModern /> },
    { title: 'Villa', icon: <MdVilla /> },
    { title: 'Condo', icon: <LiaCitySolid /> },
    { title: 'Town house', icon: <MdCabin /> },
    { title: 'Multi family', icon: <BsFillHousesFill /> },
    { title: 'Farm', icon: <PiFarm /> },
    { title: 'Mobile', icon: <FaTrailer /> },
    { title: 'Land', icon: <MdTerrain /> },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: value,
    });
  };

  const handlePropertyTypeSelect = (title: string) => {
    updateFormData({
      propertyType: title,
    });
  };

  return (
    <fieldset>
      <legend className="field_title">
        Property Basic Details{' '}
        {validationErrors.propertyType && <ValidationError />}
      </legend>
      <div className="add_pty_pty_type">
        <div className="add_pty_field_hdr_col">
          <label htmlFor="propertyType" className="field_label">
            What type of property are you listing?
          </label>
          <strong>Please select one.</strong>
        </div>
        <div
          className={`add_pty_types ${
            validationErrors.propertyType ? 'error' : ''
          }`}
        >
          {propertyTypes.map((type, index) => (
            <div
              key={index}
              className={`add_pty_type ${
                formData.propertyType === type.title ? 'selected' : ''
              }`}
              onClick={() => handlePropertyTypeSelect(type.title)}
            >
              <div className="add_type_ttl">{type.title}</div>
              <div className="add_type_icon"> {type.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="pty_purpose_for">
          {validationErrors.propertyFor && (
            <span className="error-message">{validationErrors.title}</span>
          )}
          <div className="add_pty_field_hdr_col">
            <label htmlFor="propertyFor" className="field_label">
              What are you listing your property for?
            </label>
            <small>Sale or Rent?</small>
          </div>
          <select
            id="propertyFor"
            name="propertyFor"
            className="add_pty_select"
            value={formData.propertyFor}
            onChange={handleChange}
          >
            <option value="">Select listing purpose</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyDetailForm;
