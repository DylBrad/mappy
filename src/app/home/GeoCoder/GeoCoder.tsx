import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useControl } from 'react-map-gl';

const GeoCoder = (setViewState: any) => {
  const geocoder = new MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    marker: false,
    collapsed: true,
  });

  useControl(() => geocoder);
  geocoder.on('result', (e: any) => {
    const coords = e.result.geometry.coordinates;
    setViewState({
      longitude: coords[0],
      latitude: coords[1],
      zoom: 15,
    });
  });

  return null;
};

export default GeoCoder;
