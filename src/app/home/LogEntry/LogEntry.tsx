import React from 'react';
import { Popup } from 'react-map-gl';
import { IconContext } from 'react-icons';
import { GrLocationPin } from 'react-icons/gr';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

// import Likes from '../Likes/Likes';

const LogEntry = ({
  longi,
  lati,
  setPopupInfo,
  img,
  title,
  description,
  authorId,
  id,
}: any) => {
  let decodedToken: any | undefined;

  const [placeName, setPlaceName] = React.useState('');
  const [trimmedDescription, setTrimmedDescription] = React.useState('');

  // COOKIES
  const [cookies] = useCookies<string>(['user']);
  const token = cookies.token;
  decodedToken = undefined;
  let userId = undefined;
  if (token !== undefined) {
    decodedToken = jwt_decode(token);
    userId = decodedToken._id;
  }

  const getUserArea = async () => {
    const reversedCoords = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longi},${lati}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
    );
    const response = await reversedCoords.json();
    setPlaceName(response.features[2].place_name);
  };

  const trimDescription = (string: string, length: number) => {
    const trimmedString = string.substring(0, length);
    return trimmedString;
  };

  React.useEffect(() => {
    getUserArea();
    setTrimmedDescription(trimDescription(description, 95));
    console.log('TOKEN*********____>', decodedToken);
    // eslint-disable-next-line
  }, []);

  return (
    <Popup
      longitude={longi}
      latitude={lati}
      anchor="bottom"
      onClose={() => setPopupInfo(null)}
      style={{ padding: 0 }}
    >
      <div className="popup-img-container">
        <img className="popup-image" alt="location" src={img}></img>
      </div>

      <div className="mapbox-popup-content">
        <h2>{title}</h2>
        <div className="mapbox-popup-location">
          <GrLocationPin className="react-icons" size="10" />
          <span>{placeName}</span>
        </div>
        <p>{`${trimmedDescription}...`}</p>

        {/* <div className="mapbox-popup-content-likes">
          <Likes id={id} authorId={authorId} path={'logs'} userId={userId} />
        </div> */}
      </div>
    </Popup>
  );
};

export default LogEntry;
