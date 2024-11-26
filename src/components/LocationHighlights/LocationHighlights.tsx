import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './LocationHighlights.css';
import 'leaflet/dist/leaflet.css';
import { MAPMARKERS } from '../../MOCK_DATA';
const LocationHighlights = () => {
  return (
    <section className="location_highlights">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {MAPMARKERS.map((marker) => (
          <Marker key={marker.id} position={marker.geocode}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
        
      </MapContainer>
    </section>
  );
};

export default LocationHighlights;
