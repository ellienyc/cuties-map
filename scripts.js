

mapboxgl.accessToken = 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ';

const petsMap = new mapboxgl.Map({
    container: 'map-container', // container ID
    center: [-73.97604, 40.76906], // starting position [lng, lat]
    zoom: 11.5, // zoom level
    minZoom: 11,
    maxZoom: 15,
    //hash: true, // Enable hash in the URL to reflect the map's center and zoom level
    bearing: 28.9, // bearing in degrees
    pitch: 0, // pitch in degrees
    style: 'mapbox://styles/mapbox/satellite-v9' // style URL
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
        typeColor = 'brown'
    }
    if (record.type === 'dog') {
        typeColor = 'blue'
    }
    
    
new mapboxgl.Marker({
        scale: 0.8,
        color: typeColor
    })
        .setLngLat([record.longitude, record.latitude])
        .setPopup(popup)
        .addTo(petsMap)
})