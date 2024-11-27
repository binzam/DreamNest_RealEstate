import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './LocationHighlights.css';
import 'leaflet/dist/leaflet.css';
import { MAPMARKERS } from '../../MOCK_DATA';
import { Icon, DivIcon } from 'leaflet';
import LocationIcon from '../../assets/location-icon.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { MarkerCluster } from 'leaflet';
const LocationHighlights = () => {
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

  return (
    <section className="location_highlights">
      <h1 className="locations_ttl">Hottest Locations</h1>
      <div className="map_container">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {MAPMARKERS.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.geocode}
                icon={customIcon}
              >
                <Popup>
                  <div className='map_popup'>
                    <img src={marker.popupImg} alt={marker.popup} />
                    <strong>{marker.popup}</strong>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </section>
  );
};

export default LocationHighlights;
