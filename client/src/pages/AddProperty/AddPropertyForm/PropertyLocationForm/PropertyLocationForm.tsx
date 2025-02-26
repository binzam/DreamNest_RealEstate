import React, { useState } from 'react';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { GiConfirmed } from 'react-icons/gi';
import ErrorDisplay from '../../../../components/ErrorDisplay/ErrorDisplay';
import { PropertyFormData } from '../../../../types/propertyTypes';
import MapDisplay from '../../../../components/MapDisplay/MapDisplay';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import './PropertyLocationForm.css';
import ValidationError from '../ValidationError';
interface PropertyLocationFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  validationErrors: Record<string, string>;
}

const PropertyLocationForm: React.FC<PropertyLocationFormProps> = ({
  formData,
  updateFormData,
  validationErrors,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const [changeLocation, setChangeLocation] = useState<boolean>(false);
  const { street, city, state, country } = formData.address;

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };
  const confirmAddress = async () => {
    const { city, country } = formData.address;
    const address = city && country ? `${city}, ${country}` : city || country;

    if (address) {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
        );
        console.log('location data', response);

        const location = response.data[0];
        if (location) {
          updateFormData({
            address: {
              ...formData.address,
              latitude: parseFloat(location.lat),
              longitude: parseFloat(location.lon),
            },
          });
          setMapVisible(true);
          setChangeLocation(true);
        } else {
          setErrorMessage('No location found for the given address');
        }
      } catch (error) {
        setErrorMessage('Error fetching geolocation');
        console.error('Error fetching geolocation:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } else {
      setErrorMessage('Please enter a valid address');
    }
  };

  const handleChangeLocation = () => {
    updateFormData({
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        latitude: 0,
        longitude: 0,
      },
    });
    setMapVisible(false);
    setChangeLocation(false);
  };
  const handleMapClick = (lat: number, lng: number) => {
    updateFormData({
      address: {
        ...formData.address,
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const latitude = formData.address.latitude ?? 51.505;
  const longitude = formData.address.longitude ?? -0.09;

  return (
    <fieldset>
      <legend className="field_title">
        Property Location{' '}
        {(validationErrors['address.street'] ||
          validationErrors['address.city'] ||
          validationErrors['address.state'] ||
          validationErrors['address.country']) && <ValidationError />}
      </legend>
      {!changeLocation && (
        <div className="location_input">
          <h3>Enter the full address of the property.</h3>
          <div className="adress_inputs">
            <div className="adress_input">
              <label htmlFor="street">Street</label>
              <input
                className={`rounded_input ${
                  validationErrors['address.street'] ? 'error' : ''
                }`}
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={handleLocationChange}
                placeholder="Enter Street Address"
                required
              />
            </div>

            <div className="adress_input">
              <label htmlFor="city">City</label>
              <input
                className={`rounded_input ${
                  validationErrors['address.city'] ? 'error' : ''
                }`}
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleLocationChange}
                placeholder="Enter City"
                required
              />
            </div>

            <div className="adress_input">
              <label htmlFor="state">
                State <small></small>
              </label>
              <input
                className={`rounded_input ${
                  validationErrors['address.state'] ? 'error' : ''
                }`}
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={handleLocationChange}
                placeholder="Enter State"
                required
              />
            </div>

            <div className="adress_input">
              <label htmlFor="country">Country</label>
              <input
                className={`rounded_input ${
                  validationErrors['address.country'] ? 'error' : ''
                }`}
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleLocationChange}
                placeholder="Enter Country"
                required
              />
            </div>
          </div>
        </div>
      )}
      {errorMessage && <ErrorDisplay message={errorMessage} />}
      {!changeLocation ? (
        <button
          className="confirm_adrs_btn"
          type="button"
          onClick={confirmAddress}
        >
          <GiConfirmed /> Click to Confirm Address
        </button>
      ) : (
        <button
          className="change_location_btn"
          type="button"
          onClick={handleChangeLocation}
        >
          Click to change address
        </button>
      )}

      {mapVisible && (
        <div className="add_pty_map_input">
          <p>Pinpoint the location of the property.</p>
          <small>
            <IoMdInformationCircleOutline />
            Please be as precise as possible.
          </small>

          <div className="add_pty_map_container">
            {loading ? (
              <GridLoader
                className="map_loading"
                color="#13ccbb"
                margin={20}
                size={45}
              />
            ) : (
              <MapDisplay
                latitude={latitude}
                longitude={longitude}
                mapSize="lrg"
                onMapClick={handleMapClick}
              />
            )}
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default PropertyLocationForm;
