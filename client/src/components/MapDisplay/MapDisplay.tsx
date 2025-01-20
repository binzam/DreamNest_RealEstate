import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationIcon from '../../assets/location-icon.png';
import './MapDisplay.css';
interface MapDisplayProps {
  latitude: number;
  longitude: number;
  mapSize: string;
  onMapClick?: (lat: number, lng: number) => void;
}
const MapClick = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
};

const MapDisplay = ({
  latitude,
  longitude,
  mapSize,
  onMapClick,
}: MapDisplayProps) => {
  const customIcon = new Icon({
    iconUrl: LocationIcon,
    iconSize: [38, 38],
  });
  return (
    <div className={`map_display ${mapSize}`}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {onMapClick && <MapClick onMapClick={onMapClick} />}
        <Marker icon={customIcon} position={[latitude, longitude]}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
