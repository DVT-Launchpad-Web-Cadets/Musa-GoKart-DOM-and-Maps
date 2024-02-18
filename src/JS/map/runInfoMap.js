export function drawLap(lapDetails){

    let map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

    let latlngs = [];
    if(lapDetails?.[0]){
        
        for(let lap of lapDetails){
            if(lap['Lat.'] && lap['Lon.']){
                latlngs.push(fixCoordinates(lap['Lat.'], lap['Lon.']))
            }
        } 
    }
   
    let polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    
    map.fitBounds(polyline.getBounds());

    // TODO: Fix the motion of the lap

    // L.Motion.polyline(latlngs, {
    //     color: "blue"
    // }, {
    //     auto: true,
    //     duration: 3000,
    //     easing: L.Motion.Ease.easeInOutQuart
    // }, {
    //     removeOnEnd: true,
    //     showMarker: true,
    //     icon: L.divIcon({html: "<i class='fa fa-car fa-2x' aria-hidden='true'></i>", iconSize: L.point(27.5, 24)})
    // }).addTo(map);
}

function fixCoordinates(lat, lon) {
    lat = lat / 3600000;
    lon = lon / 3600000;

    return [lat, lon];
}



