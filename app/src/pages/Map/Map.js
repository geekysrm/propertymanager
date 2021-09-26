import React from "react";

import CustomMap from "../../components/CustomMap/CustomMap";

export default function Map() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "30%" }}>Hello</div>
      <div style={{ width: "70%" }}>
        <CustomMap />
      </div>
    </div>
  );
}
