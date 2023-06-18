'use client';
import * as React from 'react';
import styles from '../page.module.css';
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';

import { listLogEntries } from '../API';
import Nav from '../components/Nav';
import GeoCoder from './GeoCoder/GeoCoder';
import LogEntry from './LogEntry/LogEntry';
import NewEntryForm from './NewEntryForm/NewEntryForm';

export default function Home() {
  interface ViewState {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  interface NewEntryLocation {
    latitude: number;
    longitude: number;
  }

  const [logEntries, setLogEntries] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState<any | null>(null);
  const [newEntryLocation, setNewEntryLocation] =
    React.useState<NewEntryLocation | null>(null);
  const [viewState, setViewState] = React.useState<ViewState | null>({
    longitude: -6.2603,
    latitude: 53.3498,
    zoom: 11,
  });

  // Make request to backend here
  const getAllMarkers = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  const setCoordinatesToUserLocation = async () => {
    const userCoords = await fetch('https://ipapi.co/json/');
    const response = await userCoords.json();
    setViewState({
      longitude: response.longitude,
      latitude: response.latitude,
      zoom: 11,
    });
  };

  React.useEffect(() => {
    getAllMarkers();
    setCoordinatesToUserLocation();
    console.log('Hi !!!!!!!');
  }, []);

  const showAddMarkerPopup = (e: any) => {
    if (!newEntryLocation) {
      setNewEntryLocation({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
      setViewState({
        latitude: e.lngLat.lat + 0.002127,
        longitude: e.lngLat.lng,
        zoom: 16,
      });
    } else if (newEntryLocation) {
      setNewEntryLocation(null);
    }
  };

  return (
    <main className={styles.main}>
      <Nav />
      <Map
        {...viewState}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ marginLeft: '260px', width: 'auto', height: '100vh' }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/dylbrad/cl9h7i0r900it14pi0yg2sacm"
        onClick={showAddMarkerPopup}
      >
        <GeoCoder />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <NavigationControl position="top-right" />
        {logEntries.map((entry: any) => {
          return (
            <div>
              <Marker
                key={entry._id}
                longitude={entry.longitude}
                latitude={entry.latitude}
                onClick={(e) => {
                  // If we let the click event propagates to the map, it will immediately close the popup
                  // with `closeOnClick: true`
                  e.originalEvent.stopPropagation();
                  setPopupInfo(entry);
                }}
              ></Marker>
            </div>
          );
        })}
        {popupInfo && (
          <LogEntry
            longi={popupInfo.longitude}
            lati={popupInfo.latitude}
            setPopupInfo={setPopupInfo}
            img={popupInfo.image}
            title={popupInfo.title}
            description={popupInfo.description}
            authorId={popupInfo.authorId}
            id={popupInfo._id}
          />
        )}
        {newEntryLocation ? (
          <>
            <Popup
              longitude={newEntryLocation.longitude}
              latitude={newEntryLocation.latitude}
              anchor="bottom"
              onClose={() => setNewEntryLocation(null)}
              style={{ maxWidth: '550px', width: 'auto', height: '100vh' }}
            >
              <div>
                <NewEntryForm
                  onClose={() => {
                    setNewEntryLocation(null);
                    getAllMarkers();
                  }}
                  location={newEntryLocation}
                  // setIsSignUp={props.setIsSignUp}
                  // setShowAuthModal={props.setShowAuthModal}
                  setNewEntryLocation={setNewEntryLocation}
                />
              </div>
            </Popup>
          </>
        ) : null}
      </Map>
    </main>
  );
}
