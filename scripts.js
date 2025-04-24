mapboxgl.accessToken = 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-73.97604, 40.76906], // starting position [lng, lat]
    zoom: 11.5, // opening zoom level
    minZoom: 11, // constraining the Zoom level
    maxZoom: 15,
    //hash: true, // Enable hash in the URL to reflect the map's center and zoom level
    bearing: 28.9, // switching to Manhattan north
    pitch: 0, // pitch in degrees, so map is flat and not 3D
    style: 'mapbox://styles/mapbox/satellite-v9' // style URL
});

map.on('load', () => {
    map.addSource('dogRuns', {
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/hxx3-bwgv.geojson'
    });

    map.addLayer({
        'id': 'dogRuns',
        'type': 'fill',
        'source': 'dogRuns',
        'layout': {},
        'paint': {
            'fill-color': '#f08',
            'fill-opacity': 1,
            'outline-color': '#f08',
            'outline-width': 200
        }
    });
});

const markerOptions = {
    color: 'brown', // default is 'red'
    draggable: false // make it draggable
};

petData.forEach((record) => {
    const popup = new mapboxgl.Popup({
        offset: 36,
    }).setText(
        `${record.name} live(s) here.`
    );

    let typeColor = '#ccc';

    if (record.type === 'cat') {
        typeColor = 'brown';
    }
    if (record.type === 'dog') {
        typeColor = 'blue';
    }

    new mapboxgl.Marker({
        scale: 0.8,
        color: typeColor
    })
        .setLngLat([record.longitude, record.latitude])
        .setPopup(popup)
        .addTo(map);
});