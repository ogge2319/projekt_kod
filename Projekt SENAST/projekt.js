var map;
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
	

    // Function to add a custom image marker to a specified layer
    function addCustomMarker(lat, lon, name, area) {
        var iconUrl = "pinpoint.png";  // Standardikon för alla POI:er
        var popupContent = "Point Of Interest";  // Standard text

        //Färnebofjärden
        var windShelterF = ["Bårbyhällan", "Skekarsbo", "Brattnäset", "Östa norr"];
        var bathPlaceF = ["Båtsportklubben", "Dragsheden öst", "Dragsheden väst", "Göknäset", "Östa väst", "Sandön", "Strångnäs"];

        //Gysinge
        var campingG = ["Östa Camping"];
        var gysingepoiG = ["Edsviken", "Gärdsvekarna", "Gysinge", "Ista", "Karlhomen"];
        var cafeG = ["Cafe Udden"];

        //Hedesundafjärden
        var windShelterH = ["Åshuvudet", "Kvillanudden"];
        var bathPlaceH = ["Gnupe", "Hade", "Korsnäset", "Norra Sundet", "Östveda", "Sandsnäsbadet", "Södra Sundet"];


        // Mapping of special POI names to their respective image files
        var specialPoiImages = {

            //Färnebofjärden
            "Bårbyhällan": "barbyhallen.png",
            "Skekarsbo": "skekarsbo.png",
            "Brattnäset": "brattnaset.png",
            "Östa norr": "ostanorr.png",
            "Båtsportklubben": "batsportklubben.png",
            "Dragsheden öst": "dragshedenost.png",
            "Dragsheden väst": "dragshedenvast.png",
            "Göknäset": "goknaset.png",
            "Östa väst": "ostavast.png",
            "Sandön": "sandon.png",
            "Strångnäs": "strangnas.png",
            "Östa Camping": "ostacamping.png",

            //Gysinge
            "Cafe Udden": "cafeudden.png",
            "Edsviken": "edsviken.png",
            "Gärdsvekarna": "gardsvekarna.png",
            "Gysinge": "gysinge.png",
            "Ista": "ista.png",
            "Karlhomen": "ista.png",

            //Hedesundafjärden
            "Åshuvudet": "ashuvudet.png",
            "Gnupe": "gnupe.png",
            "Hade": "hade.png",
            "Korsnäset": "korsnaset.png",
            "Kvillanudden": "kvillanudden.png",
            "Norra Sundet": "norrasundet.png",
            "Östveda": "ostveda.png",
            "Sandsnäsbadet": "sandsnasbadet.png",
            "Södra Sundet": "sodrasundet.png",












        };
        //Färnebofjärden POI
        if (windShelterF.includes(name)) {
            iconUrl = "windshelter.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            }
        }

        if (bathPlaceF.includes(name)) {
            iconUrl = "bathPlace.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>En badplats där du kan ta ett dop";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "En badplats där du kan ta ett dop";
            }
        }

        //GysingePOI
        if (campingG.includes(name)) {
            iconUrl = "camping.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>En camping plats, där du kan stanna ett tag och koppla av";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "En camping plats, där du kan stanna ett tag och koppla av";
            }
        }



        if (gysingepoiG.includes(name)) {
            iconUrl = "windshelter.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            }
        }

        if (cafeG.includes(name)) {
            iconUrl = "cafe.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>Ett fint cafe i Gysinge, Kom och testa!";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "Ett fint cafe i Gysinge, Kom och testa!";
            }
        }

        //Hedesundafjärden POI
        if (windShelterH.includes(name)) {
            iconUrl = "windshelter.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "Ett vindskydd, där du kan vila och grilla och njuta av platsen";
            }
        }

        if (bathPlaceH.includes(name)) {
            iconUrl = "bathPlace.png"; // Use special icon for these POIs
            var specialImageUrl = specialPoiImages[name]; // Get the image path from the mapping

            if (specialImageUrl) {
                // If an image URL exists for this POI name, use it in the popupContent
                popupContent = "<img src='" + specialImageUrl + "' style='width:200px; height:auto; margin-bottom: 5px;'><br>En badplats där du kan ta ett dop";
            } else {
                // If no image URL is defined for this POI name, use a default image or content
                popupContent = "En badplats där du kan ta ett dop";
            }
        }



		var point = new Point(lon, lat);
        var symbol = new PictureMarkerSymbol({
            "url": iconUrl,
            "width": 34,
            "height": 24
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
        // ...add all markers with their respective area
    ];
	
	
	//Biking and Hiking without elevation START
	getPostsData();
		getPostsSlinga();
		getPostsInfo();

		async function fetchData(file) {
			const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
			const response = await fetch(url + file);
			return response.json();
		}
		
		function getPostsData() {
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
			var postsLayer = new GraphicsLayer();
			map.addLayer(postsLayer);

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
		//Biking and Hiking without elevation END
		
		
		//Slinga START
		async function fetchSlinga(file) {
			const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
			const response = await fetch(url + file);
			return response.json();
		}

		function getPostsSlinga() {

			fetchSlinga("Etapp_Slinga_11_1_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_12_1_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_21_1_wgs84.json").then(showSlinga);
			

		}

		function showSlinga(data) {
        var slingaLayer = new GraphicsLayer();
        map.addLayer(slingaLayer);

        var polyline = new Polyline();
        var path = [];

        data.posts.forEach(post => {
            path.push([post.longitude, post.latitude]);
        });

        polyline.addPath(path);

        var symbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0, 0, 255]), 
            6 // Width of the line
        );

        var graphic = new Graphic(polyline, symbol);

        var info = new InfoTemplate();
        info.setTitle("Slinga Information");
        graphic.setInfoTemplate(info);

        slingaLayer.add(graphic);
		}
		//Slinga END
		
		
		//Biking and Hiking with elevation START
		async function fetchInfo(file) {
			const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/biking_walking_with_elevation/";
			const response = await fetch(url + file);
			return response.json();
		}

		function getPostsInfo() {
			
			
			
			fetchInfo("Biking_elevation161008.json").then(showInfo);
			fetchInfo("Walk_elevation_123547.json").then(showInfo);
			fetchInfo("Walk_elevation_151851.json").then(showInfo);
			
			
		}

		function showInfo(data) {
        var infoLayer = new GraphicsLayer();
        map.addLayer(infoLayer);

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
            new Color([255, 0, 0]), // Svart färg
            6 // Linjens bredd
        );

        var graphic = new Graphic(polyline, symbol);

        var info = new InfoTemplate();
        info.setTitle("Biking and Hiking with elevation");
        graphic.setInfoTemplate(info);
        infoLayer.add(graphic);
		} 

		//Biking and Hiking with elevation END
	
	
	
	
	

map.on("load", function () {
    // Add markers from data
    markerData.forEach(function (marker) {
        addCustomMarker(marker.lat, marker.lon, marker.name, marker.area);
    });

    // Initially, hide all areas
    for (var area in areaLayers) {
        areaLayers[area].hide();
    }

    // Function to add a custom marker on map click
    function addClickMarker(lat, lon, name) {
        var point = new Point(lon, lat);
        var symbol = new PictureMarkerSymbol({
            "url": "pinpoint.png",
            "width": 40,
            "height": 20
        });

        var template = new InfoTemplate(name); // Optionally, set a simple popup
        var graphic = new Graphic(point, symbol, {}, template);

        map.graphics.add(graphic); // Adds the marker to the map's default graphics layer
    }

    // Add a click event to place a custom marker
    map.on("click", function (evt) {
        var latitude = evt.mapPoint.getLatitude();
        var longitude = evt.mapPoint.getLongitude();
        addClickMarker(latitude, longitude, "Anpassad plats");
    });
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
