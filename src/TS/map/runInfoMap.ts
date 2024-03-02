import * as L from 'leaflet';
import { LapDetails } from '../models/lapDetials';
export class MapUtility {
  map;
  constructor() {
    this.map = L.map('map');
  }

  addMap(mapCoordinates: { latitude: number; longitude: number }) {
    this.map.setView(
      this.fixCoordinates(mapCoordinates.latitude, mapCoordinates.longitude),
      17,
    );

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addMarkersToTrack(lapDetailsArray: LapDetails[]) {
    if (!lapDetailsArray?.[0]) {
      throw new Error('Error loading');
    }

    const karts: L.CircleMarker[] = [];

    for (const lapDetails of lapDetailsArray) {
      if (lapDetails?.dataSet?.[0]) {
        const latlng = this.fixCoordinates(
          lapDetails.dataSet[0]['Lat.'],
          lapDetails.dataSet[0]['Lon.'],
        );
        const kart = L.circleMarker(latlng, { radius: 3, className: 'kart' });
        karts.push(kart);
        kart.addTo(this.map);
      }
    }

    let index = 0;
    const move = setInterval(() => {
      for (let i = 0; i < lapDetailsArray.length; i++) {
        karts[i].setLatLng(
          this.fixCoordinates(
            lapDetailsArray[i].dataSet[index]['Lat.'],
            lapDetailsArray[i].dataSet[index]['Lon.'],
          ),
        );
      }
      index++;
      if (index >= lapDetailsArray[0].dataSet.length) {
        clearInterval(move);
      }
    }, 100);
  }

  removeLayers() {
    this.map.remove();
  }

  fixCoordinates(lat: number, lon: number): L.LatLngExpression {
    lat = lat / 1000000;
    lon = lon / 1000000;

    return [lat, lon];
  }
}
