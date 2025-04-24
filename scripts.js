mapboxgl.accessToken = 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ';

const map = new mapboxgl.Map({ //the map!
    container: 'map',
    center: [-73.9249, 40.7502], // starting position [lng, lat]
    zoom: 11.5, // opening zoom level
    minZoom: 11, // constraining the zoom level
    maxZoom: 14,
   // hash: true, // Enable hash in the URL to reflect the map's center and zoom level
    bearing: 28.9, // switching to Manhattan north
    pitch: 0, // pitch in degrees, so map is flat and not 3D
    style: 'mapbox://styles/mapbox/light-v9' // style URL
});

map.on('load', () => {
    map.addSource('dogRuns', { //data on dog parks in NYC, known as "dog runs" from NYC Open Data
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/hxx3-bwgv.geojson' //NYC Open Data has an API endpoint for the GeoJSON data! so I replace the local file with the API endpoint
    });

    map.addLayer({
        'id': 'dogRuns-fill',
        'type': 'fill',
        'source': 'dogRuns',
        'layout': {},
        'paint': {
            'fill-color': 'darkgreen', // dark green color for the dog runs
            'fill-opacity': 1,
            // 'fill-outline-color': '#f08',
            // 'stroke-color': '#f08', // stroke wasn't visible enough so I'm using a line layer, as suggested by ChatGPT https://chatgpt.com/share/6809af79-7f4c-8004-b275-8de9b5ae52f4
            // 'stroke-width': 0.0005,
        }
    });
    map.addLayer({
        'id': 'dogRuns-outline',
        'type': 'line',
        'source': 'dogRuns',
        'paint': {
            'line-color': 'darkgreen',
            'line-width': 2,
            'line-opacity': 1
        }
    });
});

const markerOptions = {
    color: 'brown', // default is 'red'
    draggable: false // make it draggable
};

petData.forEach((record) => {
    const popup = new mapboxgl.Popup({ //marker popup to get the name of the pet
        offset: 36,
    }).setText(
        `${record.name} live(s) here.`
    );

    let typeColor = '#ccc'; // default color for unknown types

    if (record.type === 'cat') { //making each marker a different color based on the type of pet (/species?)
        typeColor = 'brown';
    }
    if (record.type === 'dog') {
        typeColor = 'blue';
    }

    new mapboxgl.Marker({ //setting the marker
        scale: 0.8,
        color: typeColor
    })
        .setLngLat([record.longitude, record.latitude])
        .setPopup(popup)
        .addTo(map);
});

map.addControl(new mapboxgl.NavigationControl());
