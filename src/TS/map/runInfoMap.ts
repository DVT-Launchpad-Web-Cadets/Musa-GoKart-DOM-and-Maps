import * as L from 'leaflet';
import { DataSetEntry } from '../models/lapDetials';

export function drawLap(lapDetails: DataSetEntry[]) {
  const latlngs: L.LatLngExpression[] = [];
  if (!(lapDetails?.[0] ?? lapDetails[0]['Lat.'] ?? lapDetails[0]['Lon.'])) {
    throw Error('Error loading the map');
  }

  const map = L.map('map', {
    center: fixCoordinates(lapDetails[0]['Lat.'], lapDetails[0]['Lon.']),
    zoom: 100,
  });

  for (const lap of lapDetails) {
    if (lap['Lat.'] && lap['Lon.']) {
      latlngs.push(fixCoordinates(lap['Lat.'], lap['Lon.']));
    }
  }

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const lat = latlngs[0];

  const kart = L.circleMarker(lat, { radius: 3, className: 'kart' });

  kart.addTo(map);

  let index = 0;
  const move = setInterval(() => {
    kart.setLatLng(latlngs[index]);
    index++;
    if (index >= latlngs.length) {
      clearInterval(move);
    }
  }, 100);
}

function fixCoordinates(lat: number, lon: number): L.LatLngExpression {
  lat = lat / 1000000;
  lon = lon / 1000000;

  return [lat, lon];
}
