require([
    "esri/map",
    "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/Color",
    "dojo/domReady!"
], function (Map, Point, PictureMarkerSymbol, Graphic, Color) {
    var map;
    map = new Map("viewDiv", {
        basemap: "streets",
        center: [14.3505, 62.0333],
        zoom: 6
    });

    map.on("load", function () {
        // Function to add a custom image marker to the map
        function addCustomMarker(lat, lon, name) {
            var point = new Point(lon, lat);

            // Create a PictureMarkerSymbol with the URL of your image, width, and height
            var symbol = new PictureMarkerSymbol({
                "url": "bilder/pinpoint.png",
                "width": 40,
                "height": 20
            });

            // Create a graphic with the point and the symbol
            var graphic = new Graphic(point, symbol);
            graphic.setAttributes({ "name": name });

            // Add the graphic to the map
            map.graphics.add(graphic);
        }

        //Färnebofjärden POI
        addCustomMarker(60.14311, 16.48877, "Bårbyhällan");
        addCustomMarker(60.10663, 16.48095, "Båtsportklubben");
        addCustomMarker(60.13159, 16.50868, "Brattnäset");
        addCustomMarker(60.14203, 16.47466, "Dragsheden öst");
        addCustomMarker(60.14346, 16.47136, "Dragsheden väst");
        addCustomMarker(60.11870, 16.44909, "Göknäset");
        addCustomMarker(60.10404, 16.47415, "Östa Camping");
        addCustomMarker(60.10672, 16.47674, "Östa norr");
        addCustomMarker(60.10565, 16.47127, "Östa väst");
        addCustomMarker(60.12585, 16.47325, "Sandön");
        addCustomMarker(60.12755, 16.51035, "Skekarsbo");
        addCustomMarker(60.13012, 16.47824, "Strångnäs");

        //Gysinge POI
        addCustomMarker(60.17273, 16.52870, "Cafe Udden");
        addCustomMarker(60.16877, 16.48372, "Edsviken");
        addCustomMarker(60.15752, 16.50230, "Gärdsvekarna");
        addCustomMarker(60.17277, 16.53181, "Gysinge");
        addCustomMarker(60.15225, 16.47666, "Ista");
        addCustomMarker(60.15747, 16.48537, "Karlhomen");

        //Hedesundafjärden POI
        addCustomMarker(60.21955, 17.19380, "Åshuvudet");
        addCustomMarker(60.19891, 17.12910, "Festplatsen");
        addCustomMarker(60.20745, 17.34060, "Gnupe");
        addCustomMarker(60.17909, 17.22200, "Hade");
        addCustomMarker(60.19183, 17.19460, "Korsnäset");
        addCustomMarker(60.22312, 17.28120, "Kvillanudden");
        addCustomMarker(60.22302, 0.00000, "Norra Sundet");
        addCustomMarker(60.22987, 17.57010, "Östveda");
        addCustomMarker(60.21013, 17.19190, "Sandsnäsbadet");
        addCustomMarker(60.18720, 17.22390, "Södra Sundet");
    });
});