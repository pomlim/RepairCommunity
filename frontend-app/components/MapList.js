import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '@/config/index';
const { mapboxToken } = config;

const mapList = ({ shops }) => {
  const [showPopup, togglePopup] = useState(true);
  return (
    <div>
      <ReactMapGL
        mapboxAccessToken={mapboxToken}
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '15px'
        }}
        initialViewState={{
          zoom: 15,
          latitude: shops[0].attributes.latitude,
          longitude: shops[0].attributes.longitude
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {shops.map((shop) => (
          <div key={shop.id}>
            <Marker
              latitude={shop.attributes.latitude}
              longitude={shop.attributes.longitude}
            />
          </div>
        ))}
        <NavigationControl />
      </ReactMapGL>
    </div>
  );
};

export default mapList;
