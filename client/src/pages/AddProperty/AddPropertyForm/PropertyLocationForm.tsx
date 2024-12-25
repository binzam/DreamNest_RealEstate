import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import LocationIcon from '../../../assets/location-icon.png';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { GridLoader } from 'react-spinners';
import { GiConfirmed } from 'react-icons/gi';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { PropertyFormData } from '../../../types/propertyTypes';
interface PropertyLocationFormProps {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
}

const PropertyLocationForm: React.FC<PropertyLocationFormProps> = ({
  formData,
  updateFormData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [mapVisible, setMapVisible] = useState<boolean>(false);
  const customIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [38, 38],
  });
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

  const MapClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        updateFormData({
          address: {
            ...formData.address,
            latitude: lat,
            longitude: lng,
          },
        });
      },
    });
    return null;
  };
  const latitude = formData.address.latitude ?? 51.505;
  const longitude = formData.address.longitude ?? -0.09;
  //   const isFormValid =
  //     formData.city && formData.country && formData.street && formData.state;

  return (
    <fieldset>
      <legend>Property Location</legend>
      <div className="location_pin">
        <h3>Enter the full address of your property.</h3>
        <div className="adress_inputs">
          <div className="add_form_group">
            <label htmlFor="street">Street</label>
            <input
              className="wide_rounded_input"
              type="text"
              id="street"
              name="street"
              value={street}
              onChange={handleLocationChange}
              placeholder="Enter Street Address"
              required
            />
          </div>

          <div className="add_form_group">
            <label htmlFor="city">City</label>
            <input
              className="wide_rounded_input"
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleLocationChange}
              placeholder="Enter City"
              required
            />
          </div>

          <div className="add_form_group">
            <label htmlFor="state">State</label>
            <input
              className="wide_rounded_input"
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={handleLocationChange}
              placeholder="Enter State"
              required
            />
          </div>

          <div className="add_form_group">
            <label htmlFor="country">Country</label>
            <input
              className="wide_rounded_input"
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
        {errorMessage && <ErrorDisplay message={errorMessage} />}

        <button
          className="confirm_adrs_btn"
          type="button"
          onClick={confirmAddress}
        >
          <GiConfirmed /> Confirm Property Address
        </button>

        {mapVisible && (
          <div className="add_pty_map_input">
            <h3>Pinpoint the location of the property</h3>
            <small>Please be as precise as possible.</small>

            <div className="add_pty_map_container">
              {loading ? (
                <GridLoader
                  className="map_loading"
                  color="#13ccbb"
                  margin={20}
                  size={45}
                />
              ) : (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClick />
                  <Marker icon={customIcon} position={[latitude, longitude]}>
                    <Popup>Property Location</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        )}
      </div>
    </fieldset>
  );
};

export default PropertyLocationForm;
