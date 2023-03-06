import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '@/config/index';
const { mapboxToken } = config;

const mapList = ({ initialLocation, shops }) => {
  const [showPopup, togglePopup] = useState(true);
  return (
    <div>
      {initialLocation && (
        <ReactMapGL
          mapboxAccessToken={mapboxToken}
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '15px'
          }}
          initialViewState={{
            zoom: 15,
            // latitude: initialLocation.latitude,
            // longitude: initialLocation.longitude
            // Fix data for testing (@BTS Phyathai)
            // latitude:"13.7566622643378",
            // longitude:"100.53373985564936"
            latitude: '13.793017268140483',
            longitude: '100.54925081035572'
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            // latitude={initialLocation.latitude}
            // longitude={initialLocation.longitude}
            // Fix data for testing (@BTS Phyathai)
            latitude="13.793017268140483"
            longitude="100.54925081035572"
            color="#F60909"
          />
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
      )}
    </div>
  );
};

export default mapList;
