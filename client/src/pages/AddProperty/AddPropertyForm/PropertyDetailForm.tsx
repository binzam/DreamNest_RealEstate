import { MdCabin, MdTerrain } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { FaTrailer } from 'react-icons/fa6';
const PropertyDetailForm = () => {
  const propertyTypes = [
    { title: 'House', icon: <HiHomeModern /> },
    { title: 'Condo', icon: <LiaCitySolid /> },
    { title: 'Townhome', icon: <MdCabin /> },
    { title: 'Multi family', icon: <BsFillHousesFill /> },
    { title: 'Farm', icon: <PiFarm /> },
    { title: 'Mobile', icon: <FaTrailer /> },
    { title: 'Land', icon: <MdTerrain /> },
  ];
  return (
    <fieldset>
      <legend>Property Listing Details</legend>
      <div className="add_form_group pty_type">
        <label htmlFor="propertyType">
          What type of property are you listing?
          <br />
          <small>Please select one.</small>
        </label>
        <div className="add_pty_types">
          {propertyTypes.map((type, index) => (
            <div key={index} className={`add_pty_type`}>
              <div className="type_ttl">{type.title}</div>
              <div className="type_icon"> {type.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="add_form_group pty_purpose">
        <label htmlFor="propertyFor">
          What are you listing your property for?
        </label>
        <select id="propertyFor" name="propertyFor" className="add_pty_select">
          <option value="">Listing Purpose</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </div>
    </fieldset>
  );
};

export default PropertyDetailForm;
