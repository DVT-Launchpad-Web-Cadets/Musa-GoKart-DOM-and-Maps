import * as L from "leaflet";
import '../../CSS/map.css'
// import * as M from "../../../node_modules/leaflet.motion/dist/leaflet.motion.min.js";
import { DataSet} from "../models/lapDetials";
export function drawLap(lapDetails: DataSet[]){
    const map = L.map('map', {
        center: fixCoordinates(lapDetails[0]['Lat.'], lapDetails[0]['Lon.']),
        zoom: 20
    });

    const latlngs: L.LatLngExpression[] = [];
    if(lapDetails?.[0]){
        for(let lap of lapDetails){
            if(lap['Lat.'] && lap['Lon.']){
                latlngs.push(fixCoordinates(lap['Lat.'], lap['Lon.']))
            }
        } 
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

   const lat = latlngs[0];
    const polyline = L.polyline(latlngs, { className: "lap"}).addTo(map);

    L.circle(lat, {radius: 3}).addTo(map);
    
    map.fitBounds(polyline.getBounds());

}

function fixCoordinates(lat: number, lon: number): L.LatLngExpression {
    lat = lat / 1000000;
    lon = lon / 1000000;

    return [lat, lon];
}



