export function drawLap(lapDetails){
    console.log('draw')

    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

    // let latlngs = [
    //     [45.51, -122.68],
    //     [37.77, -122.43],
    //     [34.04, -118.2]
    // ];
    let latlngs = [];
    if(lapDetails?.[0]){
        
        for(let lap of lapDetails){
            if(lap['Lat.'] && lap['Lon.']){
                latlngs.push(fixCoordinates(lap['Lat.'], lap['Lon.']))
            }
        } 
    }

    
    console.log('done');
   
    let polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    

    // // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

    L.Motion.polyline(latlngs, {
        color: "blue"
    }, {
        auto: true,
        duration: 3000,
        easing: L.Motion.Ease.easeInOutQuart
    }, {
        removeOnEnd: true,
        showMarker: true,
        icon: L.divIcon({html: "<i class='fa fa-car fa-2x' aria-hidden='true'></i>", iconSize: L.point(27.5, 24)})
    }).addTo(map);


    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // L.marker([-8.249362777777778, 8.479446388888888]).addTo(map)
    // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    // .openPopup();
}

function fixCoordinates(lat, lon) {
    lat = lat / 3600000;
    lon = lon / 3600000;

    return [lat, lon];
}



