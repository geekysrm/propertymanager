import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2Vla3lzcm0iLCJhIjoiY2pqOWlyYm9wMThubjNxbzVsbWZrZDFkYSJ9.qR-h7UMZRad_rFeA-GegMQ',
});

function renderMarkers(properties) {
  return properties.map(property => {
    return <Marker
      coordinates={[property.lng, property.lat]}
      anchor="bottom"
      key={`${property.lng}X${property.lat}`}>
      <img
        style={{ cursor: 'pointer' }}
        src="https://res.cloudinary.com/geekysrm/image/upload/v1633292206/299087_marker_map_icon.png"
        alt="map marker"
      />
    </Marker>
  })
}

export default function CustomMap({ properties }) {
  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
      }}
      center={[85.824539, 20.296059]}
    >
      {renderMarkers(properties)}
    </Map>
  );
}
