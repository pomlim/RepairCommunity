import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import config from '@/config/index';
import 'mapbox-gl/dist/mapbox-gl.css';
const { mapboxToken } = config;

const mapDetail = ({ lat, lng }) => {
  return (
    <div>
      <ReactMapGL
        mapboxAccessToken={mapboxToken}
        style={{
          width: '100%',
          height: '250px',
          borderRadius: '15px'
        }}
        initialViewState={{
          zoom: 15,
          latitude: lat,
          longitude: lng
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker latitude={lat} longitude={lng} />
        <NavigationControl />
      </ReactMapGL>
    </div>
  );
};

export default mapDetail;
