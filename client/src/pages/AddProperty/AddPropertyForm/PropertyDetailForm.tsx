import { MdCabin, MdTerrain, MdVilla } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { FaTrailer } from 'react-icons/fa6';
import { PropertyFormData } from '../../../types/propertyTypes';
interface PropertyDetailFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}
const PropertyDetailForm: React.FC<PropertyDetailFormProps> = ({
  formData,
  updateFormData,
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
      <legend>Property Basic Details</legend>
      <div className="add_form_group add_pty_pty_type">
        <label htmlFor="propertyType">
          What type of property are you listing?
          <br />
          <small>Please select one.</small>
        </label>
        <div className="add_pty_types">
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
      <div className="add_form_group">
        <div className="pty_purpose_for">
          <label htmlFor="propertyFor">
            What are you listing your property for?
          </label>
          <select
            id="propertyFor"
            name="propertyFor"
            className="add_pty_select"
            value={formData.propertyFor}
            onChange={handleChange}
          >
            <option value="">Sale / Rent</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
};

export default PropertyDetailForm;
