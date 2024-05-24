var map;
var postsLayer, slingaLayer, infoLayer, farnebofjardenPOILayer, gysingePOILayer, hedesundafjardenPOILayer;
var areaLayers = {};

require([
    "esri/map",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/InfoTemplate",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "dojo/domReady!"
], function (Map, Graphic, GraphicsLayer, InfoTemplate, Point, Polyline, PictureMarkerSymbol, SimpleLineSymbol, Color) {

    map = new Map("viewDiv", {
        basemap: "streets",
        center: [14.3505, 62.0333],
        zoom: 6
    });

    // Initialize the layers
    postsLayer = new GraphicsLayer();
    slingaLayer = new GraphicsLayer();
    infoLayer = new GraphicsLayer();
	farnebofjardenPOILayer = new GraphicsLayer();
	gysingePOILayer = new GraphicsLayer();
	hedesundafjardenPOILayer = new GraphicsLayer();

    map.addLayer(postsLayer);
    map.addLayer(slingaLayer);
    map.addLayer(infoLayer);
	map.addLayer(farnebofjardenPOILayer);
	map.addLayer(gysingePOILayer);
	map.addLayer(hedesundafjardenPOILayer);

    // Hide all layers initially
    postsLayer.hide();
    slingaLayer.hide();
    infoLayer.hide();
	farnebofjardenPOILayer.hide();
	gysingePOILayer.hide();
	hedesundafjardenPOILayer.hide();

    // Clear markers
    function clearMarkers() {
        for (var areaKey in areaLayers) {
            areaLayers[areaKey].clear(); // Clear all markers
        }
    }

    // Biking and Hiking without elevation
    async function fetchData(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsData() {
        clearMarkers(); // Clear existing markers
        postsLayer.clear();
        postsLayer.show();
        slingaLayer.hide();
        infoLayer.hide();
		farnebofjardenPOILayer.hide();
		gysingePOILayer.hide();
		hedesundafjardenPOILayer.hide();

        fetchData("Etapp_11_wgs84.json").then(showPosts);
        fetchData("Etapp_12_wgs84.json").then(showPosts);
        fetchData("Etapp_13_wgs84.json").then(showPosts);
        fetchData("Etapp_14_wgs84.json").then(showPosts);
        fetchData("Etapp_15_wgs84.json").then(showPosts);
        fetchData("Etapp_16_wgs84.json").then(showPosts);
        fetchData("Etapp_17_wgs84.json").then(showPosts);
        fetchData("Etapp_19_wgs84.json").then(showPosts);
        fetchData("Etapp_20_wgs84.json").then(showPosts);
        fetchData("Etapp_21_wgs84.json").then(showPosts);
        fetchData("Etapp_22_wgs84.json").then(showPosts);
        fetchData("Etapp_Slinga_11_1_wgs84.json").then(showPosts);
    }

    function showPosts(data) {
        data.posts.forEach(post => {
            const symbol = new PictureMarkerSymbol("roads.png", 12, 12);
            const lat = post.latitude;
            const lng = post.longitude;
            var p = new Point(lng, lat);
            var graphic = new Graphic(p, symbol);

            var info = new InfoTemplate();
            info.setTitle("Biking/Hiking with no elevation");
            graphic.setInfoTemplate(info);
            postsLayer.add(graphic);
        });
    }

    // Slinga
    async function fetchSlinga(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsSlinga() {
        clearMarkers(); // Clear existing markers
        slingaLayer.clear();
        slingaLayer.show();
        postsLayer.hide();
        infoLayer.hide();
		farnebofjardenPOILayer.hide();
		gysingePOILayer.hide();
		hedesundafjardenPOILayer.hide();

        fetchSlinga("Etapp_Slinga_11_1_wgs84.json").then(showSlinga);
        fetchSlinga("Etapp_Slinga_12_1_wgs84.json").then(showSlinga);
        fetchSlinga("Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json").then(showSlinga);
        fetchSlinga("Etapp_Slinga_21_1_wgs84.json").then(showSlinga);
    }

    function showSlinga(data) {
        var polyline = new Polyline();
        var path = [];

        data.posts.forEach(post => {
            path.push([post.longitude, post.latitude]);
        });

        polyline.addPath(path);

        var symbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0, 0, 255]),
            6
        );

        var graphic = new Graphic(polyline, symbol);

        var info = new InfoTemplate();
        info.setTitle("Slinga Information");
        graphic.setInfoTemplate(info);

        slingaLayer.add(graphic);
    }

    // Biking and Hiking with elevation
    async function fetchInfo(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/biking_walking_with_elevation/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsInfo() {
        clearMarkers(); // Clear existing markers
        infoLayer.clear();
        infoLayer.show();
        postsLayer.hide();
        slingaLayer.hide();
		farnebofjardenPOILayer.hide();
		gysingePOILayer.hide();
		hedesundafjardenPOILayer.hide();

        fetchInfo("Biking_elevation161008.json").then(showInfo);
        fetchInfo("Walk_elevation_123547.json").then(showInfo);
        fetchInfo("Walk_elevation_151851.json").then(showInfo);
    }

    function showInfo(data) {
        var path = [];
        data.posts.forEach(post => {
            path.push([post.longitude, post.latitude]);
        });

        var polyline = new Polyline({
            paths: [path],
            spatialReference: { wkid: 4326 }
        });

        var symbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0]),
            6
        );

        var graphic = new Graphic(polyline, symbol);

        var info = new InfoTemplate();
        info.setTitle("Biking and Hiking with elevation");
        graphic.setInfoTemplate(info);
        infoLayer.add(graphic);
    }




	//FarnebofjardenPOI
	async function fetchFarnebofjardenPOI(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/POI_JSON/FarnebofjardenPOI/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsFarnebofjardenPOI() {
        clearMarkers(); // Clear existing markers
        farnebofjardenPOILayer.clear();
        farnebofjardenPOILayer.show();
		postsLayer.hide();
        slingaLayer.hide();
        infoLayer.hide();
		gysingePOILayer.hide();
		hedesundafjardenPOILayer.hide();

        fetchFarnebofjardenPOI("BarbyHallan.JSON").then(showFarnebofjardenPOI);
    }

    function showFarnebofjardenPOI(data) {
        data.posts.forEach(post => {
            const symbol = new PictureMarkerSymbol("bathPlace.png", 30, 30);
            const lat = post.lat;
            const lng = post.lon;
			const namn = post.name;
            var p = new Point(lng, lat);
            var graphic = new Graphic(p, symbol, name);

            var info = new InfoTemplate();
            info.setTitle("Biking/Hiking with no elevation");
            graphic.setInfoTemplate(info);
            farnebofjardenPOILayer.add(graphic);
        });
    }
	
	//GysingePOI
	async function fetchGysingePOI(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/POI_JSON/GysingePOI/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsGysingePOI() {
        clearMarkers(); // Clear existing markers
        gysingePOILayer.clear();
        gysingePOILayer.show();
		postsLayer.hide();
        slingaLayer.hide();
        infoLayer.hide();
		farnebofjardenPOILayer.hide();
		hedesundafjardenPOILayer.hide();
		

        fetchGysingePOI("CafeUdden.JSON").then(showGysingePOI);
    }

    function showGysingePOI(data) {
        data.posts.forEach(post => {
            const symbol = new PictureMarkerSymbol("camping.png", 30, 30);
            const lat = post.lat;
            const lng = post.lon;
			const namn = post.name;
            var p = new Point(lng, lat);
            var graphic = new Graphic(p, symbol, name);

            var info = new InfoTemplate();
            info.setTitle("Biking/Hiking with no elevation");
            graphic.setInfoTemplate(info);
            gysingePOILayer.add(graphic);
        });
    }
	
	//HedesundafjardenPOI
	async function fetchHedesundafjardenPOI(file) {
        const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/POI_JSON/HedesundafjardenPOI/";
        const response = await fetch(url + file);
        return response.json();
    }

    function getPostsHedesundafjardenPOI() {
        clearMarkers(); // Clear existing markers
        hedesundafjardenPOILayer.clear();
        hedesundafjardenPOILayer.show();
		postsLayer.hide();
        slingaLayer.hide();
        infoLayer.hide();
		farnebofjardenPOILayer.hide();
		gysingePOILayer.hide();

        fetchHedesundafjardenPOI("Ashuvudet.JSON").then(showHedesundafjardenPOI);
    }

    function showHedesundafjardenPOI(data) {
        data.posts.forEach(post => {
            const symbol = new PictureMarkerSymbol("windshelter.png", 30, 30);
            const lat = post.lat;
            const lng = post.lon;
			const namn = post.name;
            var p = new Point(lng, lat);
            var graphic = new Graphic(p, symbol, name);

            var info = new InfoTemplate();
            info.setTitle("Biking/Hiking with no elevation");
            graphic.setInfoTemplate(info);
            hedesundafjardenPOILayer.add(graphic);
        });
    }
	
    // Event listeners
    document.getElementById("fetchDataButton").addEventListener("click", getPostsData);
    document.getElementById("fetchBikinWithoutButton").addEventListener("click", getPostsData);
	
    document.getElementById("fetchSligaButton").addEventListener("click", getPostsSlinga);
	
    document.getElementById("fetchInfoButton").addEventListener("click", getPostsInfo);
    document.getElementById("fetchBikingWithButton").addEventListener("click", getPostsInfo);
	
	document.getElementById("fetchFarnebofjardenPOIButton").addEventListener("click", getPostsFarnebofjardenPOI);
	document.getElementById("fetchGysingePOIPOIButton").addEventListener("click", getPostsGysingePOI);
	document.getElementById("fetchHedesundafjardenPOIButton").addEventListener("click", getPostsHedesundafjardenPOI);
});
