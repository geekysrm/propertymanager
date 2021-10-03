import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { svg } from './HomeIcon';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2Vla3lzcm0iLCJhIjoiY2pqOWlyYm9wMThubjNxbzVsbWZrZDFkYSJ9.qR-h7UMZRad_rFeA-GegMQ',
});

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
const images = ['propertyMarker', image];

const layoutLayer = { 'icon-image': 'propertyMarker' };

export default function CustomMap() {
  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
      }}
      center={[85.824539, 20.296059]}
    >
      <Marker coordinates={[85.824539, 20.296059]} anchor="bottom">
        <img
          src="https://res.cloudinary.com/geekysrm/image/upload/v1633292206/299087_marker_map_icon.png"
          alt="map marker"
        />
      </Marker>
      {/* <Marker coordinates={[85.824539, 20.296059]}>M</Marker> */}
      {/* <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
        <Feature coordinates={[85.824539, 20.296059]} />
      </Layer>
      <Layer
        type="circle"
        paint={{
          'circle-radius': 1000,
          'circle-color': '#E54E52',
          'circle-opacity': 0.8,
        }}
      >
        <Feature coordinates={[85.824539, 20.296059]} />
      </Layer> */}
      {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}> */}
      {/* <Feature coordinates={[85.824539, 20.296059]} /> */}
      {/* </Layer> */}
    </Map>
  );
}
