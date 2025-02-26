import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './LocationHighlights.css';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon } from 'leaflet';
import LocationIcon from '../../assets/location-icon.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { MarkerCluster } from 'leaflet';
import { Loader } from '../Loader';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { useFetchLocations } from '../../hooks/useProperties';
import Container from '../Container/Container';
import { FaLocationDot } from 'react-icons/fa6';

const LocationHighlights = () => {
  const { data, isLoading, isError, error } = useFetchLocations();

  const customIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster: MarkerCluster): DivIcon => {
    return new DivIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: 'custom-cluster-marker',
      iconSize: [33, 33],
    });
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }
  if (!data) {
    return <div>No data available.</div>;
  }

  const { properties, center } = data;
  if (properties.length === 0) {
    return <p>Not available</p>;
  }
  return (
    <section className="location_highlights">
      <Container>
        <div className="location_highlights_inner">
          <h1 className="locations_ttl">
            <FaLocationDot />
            Hottest Locations 
          </h1>
          <div className="map_container">
            <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createCustomClusterIcon}
              >
                {properties.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={marker.geocode}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="map_popup">
                        <img src={marker.popupImg} alt={marker.popup} />
                        <strong>{marker.popup}</strong>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LocationHighlights;
