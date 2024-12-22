import './AddProperty.css';
import React, { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import BackButton from '../../components/BackButton/BackButton';
import { MdAddHomeWork } from 'react-icons/md';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
interface PropertyFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  price: number;
  bed: number;
  bath: number;
  sqft: number;
  image: string;
  latitude: number;
  longitude: number;
  category: string;
  propertyFor: string;
  propertyType: string;
  detail: string;
}

const AddProperty = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    price: 0,
    bed: 0,
    bath: 0,
    sqft: 0,
    image: '',
    latitude: 0,
    longitude: 0,
    category: '',
    propertyFor: '',
    propertyType: '',
    detail: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Map Event to update Latitude and Longitude
  const MapClick = () => {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng,
        });
      },
    });
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.post(
        '/properties/add-property',
        formData
      );

      //   if (response && response.status === 201) {
      //       // Successfully added the property
      //       navigate('/properties'); // Redirect to properties list page
      //     }
      console.log(response);
    } catch (err) {
      console.log(err);

      setError('Failed to add property. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressBarWidth = (currentStep / 5) * 100;
  return (
    <div className="add_property">
      <div className="add_pty_hdr">
        <BackButton /> <h2>Add New Property</h2>
        <MdAddHomeWork className="add_icon" />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>
      <div className="add_pty_ctnt">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="pty_cat_for_type">
              <div className="form-group">
                <label htmlFor="propertyFor">What is the property for?</label>
                <select id="propertyFor">
                  <option value="relevance">Rent</option>
                  <option value="price">Sale</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="propertyType">
                  What type of property are you adding?
                </label>
                <select id="propertyType">
                  <option value="relevance">Apartment</option>
                  <option value="price">Villa</option>
                  <option value="bed">Single-Family</option>
                  <option value="bath">Multi-Family</option>
                  <option value="sqft">Condominium</option>
                  <option value="sqft">TownHouse</option>
                  <option value="sqft">Land</option>
                  <option value="sqft">Farm</option>
                  <option value="sqft">Mobile Home</option>
                  <option value="sqft">House</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="location_pin">
              <div className="adress_inputs">
                <h3>Enter the Address</h3>
                <div className="form-group">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="step">
                <h3>Location & Category</h3>
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    step="any"
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                    step="any"
                    readOnly
                  />
                </div>

                <div className="map-container">
                  <MapContainer
                    center={[
                      formData.latitude || 51.505,
                      formData.longitude || -0.09,
                    ]}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClick />
                    <Marker position={[formData.latitude, formData.longitude]}>
                      <Popup>Selected Location</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bed_bath_sqft_inputs">
              <div className="form-group">
                <label htmlFor="bed">Bedrooms</label>
                <input
                  type="number"
                  id="bed"
                  name="bed"
                  value={formData.bed}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bath">Bathrooms</label>
                <input
                  type="number"
                  id="bath"
                  name="bath"
                  value={formData.bath}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sqft">Square Footage</label>
                <input
                  type="number"
                  id="sqft"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="pty_img_upload">
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
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
          )}

          {currentStep === 5 && (
            <div className="pty_name_detail">
              <div className="form-group">
                <label htmlFor="name">Property Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="detail">Detail</label>
                <input
                  id="detail"
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
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
          )}

          <div className="add_pty_form_navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </button>
            )}
            {currentStep === 6 ? (
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Add Property'}
              </button>
            ) : (
              <button type="button" onClick={nextStep}>
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
