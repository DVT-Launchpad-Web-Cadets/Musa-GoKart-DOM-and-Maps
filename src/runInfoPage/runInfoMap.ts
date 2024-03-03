import * as L from 'leaflet';
import { LapDetails } from '../models/lapDetials';
export class MapUtility {
  map;
  move: NodeJS.Timeout | undefined;
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

  addMarkersToTrack(lapDetailsArray: LapDetails[], lapArray: number[]) {
    if (!lapDetailsArray?.[0]) {
      throw new Error('Error loading');
    }

    const karts: L.CircleMarker[] = [];
    let lapCount = 0;
    for (const lapDetails of lapDetailsArray) {
      if (lapDetails?.dataSet?.[0]) {
        const latlng = this.fixCoordinates(
          lapDetails.dataSet[0]['Lat.'],
          lapDetails.dataSet[0]['Lon.'],
        );
        const lapInfoPopup = L.tooltip().setContent(`Lap ${lapArray[lapCount]}`);
        lapInfoPopup.options.permanent = true;
        const kart = L.circleMarker(latlng, { radius: 3, className: 'kart' }).bindTooltip(lapInfoPopup);
        karts.push(kart);
        kart.addTo(this.map);
      }
      lapCount++;
    }

    let index = 0;
    this.move = setInterval(() => {
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
        clearInterval(this.move);
      }
    }, 100);
  }

  removeLayers() {
    this.map.remove();
    this.map = L.map('map');
    clearInterval(this.move);
  }

  fixCoordinates(lat: number, lon: number): L.LatLngExpression {
    lat = lat / 1000000;
    lon = lon / 1000000;

    return [lat, lon];
  }
}
