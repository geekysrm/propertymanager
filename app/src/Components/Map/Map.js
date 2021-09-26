import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ2Vla3lzcm0iLCJhIjoiY2pqOWlyYm9wMThubjNxbzVsbWZrZDFkYSJ9.qR-h7UMZRad_rFeA-GegMQ",
});

export default function CustomMap({
  value,
  type,
  name,
  placeholder,
  label,
  controlId,
  formText,
  errors,
  onHandleChange,
  className,
}) {
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    </div>
  );
}
