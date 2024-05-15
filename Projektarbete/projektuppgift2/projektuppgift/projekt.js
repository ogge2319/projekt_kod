var map, mapView;
require(["esri/map", "dojo/domReady!"], function(Map) {
    map = new Map("viewDiv", {
        basemap: "streets",
        center: [14.3505, 62.0333], // Lämpliga koordinater för mitten av Sverige
        zoom: 6
    });
});