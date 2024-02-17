export function drawLap(lapDetails){
    console.log('draw')

    // TODO: Fix the latlongs
    
    // let latlngs = [
    //     [[45.51, -122.68],
    //      [45.77, -122.43],
    //      [45.04, -122.2]],
    //     [[40.78, -73.91],
    //      [41.83, -87.62],
    //      [32.76, -96.72]]
    // ];

    let latlngs = [];
    for(let lap of lapDetails){
        if(lap['Lat.'] && lap['Lon.']){
            latlngs.push([lap['Lat.'], lap['Lon.']]);
        }
    }

    // let latlngs = [
    //     [lapDetails[0]['Lat.'], lapDetails[0]['Lon.']],
    //     [lapDetails[1]['Lat.'], lapDetails[1]['Lon.']],
    //     [lapDetails[2]['Lat.'], lapDetails[2]['Lon.']]
    // ]
    

    let map = L.map('map', {
            center: [51.505, -0.09], 
            zoom: 13,
            renderer: L.canvas()
    });

    console.log(latlngs);

    let polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

    // L.marker([latlngs[20][0], latlngs[20][1]]).addTo(map);

    // zoom the map to the polygon
    map.fitBounds(polyline.getBounds());
}


