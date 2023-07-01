import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import "./ContactMap.scss";
import { useMemo } from "react";

const ContactMap = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: "10px" }}>
      <GoogleMap zoom={10} center={center} mapContainerClassName="contact__map">
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default ContactMap;
