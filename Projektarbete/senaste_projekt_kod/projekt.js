var map;
var areaLayers = {};

require([
    "esri/InfoTemplate",
    "esri/map",
    "esri/layers/GraphicsLayer",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "dojo/domReady!"
], function (InfoTemplate, Map, GraphicsLayer, Point, PictureMarkerSymbol, Graphic) {    

    var beachPOIs = ["Strångnäs", "Dragsheden öst"];  // Lista över badplatser
    var specialPOIs = ["Bårbyhällan", "Skekarsbo", "Brattnäset", "Östa norr", "Sandön"];    //Lista över vindskydd

    map = new Map("viewDiv", {
        basemap: "streets",
        center: [14.3505, 62.0333],
        zoom: 6
    });

    getPostsData();

    async function fetchData(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsData() {
        fetchData("Etapp_11_wgs84.json" + "?token=GHSAT0AAAAAACRFCSVWXNSIBTEZBWDKKGV2ZRKK27A").then(showPosts);
    }

    function showPosts(data) {
        var postsLayer = new GraphicsLayer();
        map.addLayer(stopsLayer);

        data.posts.forEach(post => {
            const symbol = new PictureMarkerSymbol("roads.png", 10, 10);
            const lat = post.latitude;
            const lng = post.longitude;
            var p = new Point(lng, lat);
            var graphic = new Graphic(p, symbol);

            var info = new InfoTemplate();
            info.setTitle("OK_MANNEN");
            graphic.setInfoTemplate(info);
            postsLayer.add(graphic);
        });
    }

// Function to add a custom image marker to a specified layer
function addCustomMarker(lat, lon, name, area) {
    var iconUrl = "pinpoint.png";  // Standardikon för alla POI:er
    var popupContent = "Fiskarjanne";  // Standard text

    if (specialPOIs.includes(name)) {
        iconUrl = "windshelter.png";  // Använd speciell ikon för dessa POI
        popupContent = "En plats att ta en paus och vila upp kroppen!";
    }

    var point = new Point(lon, lat);
    var symbol = new PictureMarkerSymbol({
        "url": iconUrl,
        "width": 24,
        "height": 20
    });

    var template = new InfoTemplate(name, popupContent);
    var graphic = new Graphic(point, symbol, {}, template);

    if (!areaLayers[area]) {
        areaLayers[area] = new GraphicsLayer();
        map.addLayer(areaLayers[area]);
    }

    areaLayers[area].add(graphic);
}

function addBeachMarker(lat, lon, name, area) {
    var iconUrl = "pinpoint.png";  // Standardikon för alla POI:er
    var popupContent = "Välkommen till stranden!";  // Standardtext för badplatser

    if (beachPOIs.includes(name)) {
        iconUrl = "Badplats.png";  // Använd din speciella badplatsikon
        popupContent = "Här kan du njuta av solen och bada!";  // Anpassad text för badplatser
    }

    var point = new Point(lon, lat);
    var symbol = new PictureMarkerSymbol({
        "url": iconUrl,
        "width": 24,  // Bredd på ikonen
        "height": 20  // Höjd på ikonen
    });

    var template = new InfoTemplate(name, popupContent); // Skapa en infobubbla med titel och innehåll
    var graphic = new Graphic(point, symbol, {}, template);

    if (!areaLayers[area]) {
        areaLayers[area] = new GraphicsLayer();
        map.addLayer(areaLayers[area]);
    }

    areaLayers[area].add(graphic);
}



// Define marker data
var markerData = [


    //Färnebofjärden POI
    { lat: 60.14311, lon: 16.48877, name: "Bårbyhällan", area: "canoe_farnebofjarden" },
    { lat: 60.10663, lon: 16.48095, name: "Båtsportklubben", area: "canoe_farnebofjarden" },
    { lat: 60.13159, lon: 16.50868, name: "Brattnäset", area: "canoe_farnebofjarden" },
    { lat: 60.14203, lon: 16.47466, name: "Dragsheden öst", area: "canoe_farnebofjarden" },
    { lat: 60.14346, lon: 16.47136, name: "Dragsheden väst", area: "canoe_farnebofjarden" },
    { lat: 60.1187, lon: 16.44909, name: "Göknäset", area: "canoe_farnebofjarden" },
    { lat: 60.10404, lon: 16.47415, name: "Östa Camping", area: "canoe_farnebofjarden" },
    { lat: 60.10672, lon: 16.47674, name: "Östa norr", area: "canoe_farnebofjarden" },
    { lat: 60.10565, lon: 16.47127, name: "Östa väst", area: "canoe_farnebofjarden" },
    { lat: 60.12585, lon: 16.47325, name: "Sandön", area: "canoe_farnebofjarden" },
    { lat: 60.12755, lon: 16.51035, name: "Skekarsbo", area: "canoe_farnebofjarden" },
    { lat: 60.13012, lon: 16.47824, name: "Strångnäs", area: "canoe_farnebofjarden" },


    //Gysinge POI
    { lat: 60.17273, lon: 16.52870, name: "Cafe Udden", area: "canoe_gysinge" },
    { lat: 60.16877, lon: 16.48372, name: "Edsviken", area: "canoe_gysinge" },
    { lat: 60.15752, lon: 16.50230, name: "Gärdsvekarna", area: "canoe_gysinge" },
    { lat: 60.17277, lon: 16.53181, name: "Gysinge", area: "canoe_gysinge" },
    { lat: 60.15225, lon: 16.47666, name: "Ista", area: "canoe_gysinge" },
    { lat: 60.15747, lon: 16.48537, name: "Karlhomen", area: "canoe_gysinge" },


    //Hedesundafjärden POI
    { lat: 60.21955, lon: 17.19380, name: "Åshuvudet", area: "canoe_hedesundafjärden" },
    { lat: 60.19891, lon: 17.12910, name: "Festplatsen", area: "canoe_hedesundafjärden" },
    { lat: 60.20745, lon: 17.34060, name: "Gnupe", area: "canoe_hedesundafjärden" },
    { lat: 60.17909, lon: 17.22200, name: "Hade", area: "canoe_hedesundafjärden" },
    { lat: 60.19183, lon: 17.19460, name: "Korsnäset", area: "canoe_hedesundafjärden" },
    { lat: 60.22312, lon: 17.28120, name: "Kvillanudden", area: "canoe_hedesundafjärden" },
    { lat: 60.22302, lon: 0.00000, name: "Norra Sundet", area: "canoe_hedesundafjärden" },
    { lat: 60.22987, lon: 17.57010, name: "Östveda", area: "canoe_hedesundafjärden" },
    { lat: 60.21013, lon: 17.19190, name: "Sandsnäsbadet", area: "canoe_hedesundafjärden" },
    { lat: 60.18720, lon: 17.22390, name: "Södra Sundet", area: "canoe_hedesundafjärden" }

];
map.on("load", function () {
    // Add markers from data
    markerData.forEach(function (marker) {
        if (specialPOIs.includes(marker.name)) {
            // Använd specialikon för vindskydd
            addCustomMarker(marker.lat, marker.lon, marker.name, marker.area);
        } else if (beachPOIs.includes(marker.name)) {
            // Använd badplatsikonen för badplatser
            addBeachMarker(marker.lat, marker.lon, marker.name, marker.area);
        } else {
            // För alla andra POI, använd standardikonen
            addCustomMarker(marker.lat, marker.lon, marker.name, marker.area);
        }
    });

    // Initially, hide all areas
    for (var area in areaLayers) {
        areaLayers[area].hide();
    }
});



// Function to show only the selected area's markers
window.showArea = function (area) {
    for (var layer in areaLayers) {
        areaLayers[layer].hide(); // Hide all layers
    }
    if (areaLayers[area]) {
        areaLayers[area].show(); // Show the selected area
    }
};

window.showArea = function (mainArea, subArea) {
    for (var areaKey in areaLayers) {
        areaLayers[areaKey].hide(); // Hide all layers
    }
    var targetArea = mainArea + '_' + subArea;
    if (areaLayers[targetArea]) {
        areaLayers[targetArea].show(); // Show the selected sub-area
    }
};

});
