require(["esri/map", "esri/graphic", "esri/layers/GraphicsLayer", "esri/InfoTemplate", "esri/geometry/Point", "esri/symbols/PictureMarkerSymbol", "dojo/domReady!"],
	function (Map, Graphic, GraphicsLayer, InfoTemplate, Point, PictureMarkerSymbol) {
		var map = new Map("viewDiv", {
			basemap: "streets",
			center: [17.151189, 60.676245],
			zoom: 13
		});

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
			fetchData("Etapp_Slinga_11_1_wgs84.json").then(showPosts);	//byt bild till slinga, skapa ny funktion


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
				info.setTitle("OK_MANNEN");
				graphic.setInfoTemplate(info);
				postsLayer.add(graphic);
			});
		}
		async function fetchSlinga(file) {
			const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/Biking_walking_no_elevation/";
			const response = await fetch(url + file);
			return response.json();
		}

		function getPostsSlinga() {

			fetchSlinga("Etapp_Slinga_11_1_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_12_1_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json").then(showSlinga);
			fetchSlinga("Etapp_Slinga_21_1_wgs84.json").then(showSlinga);	//byt bild till slinga, skapa ny funktion
			

		}

		function showSlinga(data) {
			var slingaLayer = new GraphicsLayer();
			map.addLayer(slingaLayer);

			data.posts.forEach(post => {
				const symbol = new PictureMarkerSymbol("roads_slinga.png", 12, 12);
				const lat = post.latitude;
				const lng = post.longitude;
				var p = new Point(lng, lat);
				var graphic = new Graphic(p, symbol);

				var info = new InfoTemplate();
				info.setTitle("OK_MANNEN");
				graphic.setInfoTemplate(info);
				slingaLayer.add(graphic);
			});
		}

		async function fetchInfo(file) {
			const url = "https://raw.githubusercontent.com/ogge2319/projekt_kod/main/biking_walking_with_elevation/";
			const response = await fetch(url + file);
			return response.json();
		}

		function getPostsInfo() {

			//byt bild till slinga, skapa ny funktion
			fetchInfo("Biking_elevation161008.json").then(showInfo);
			fetchInfo("Walk_elevation_123547.json").then(showInfo);
			fetchInfo("Walk_elevation_151851.json").then(showInfo);
			
			
		}

		function showInfo(data) {
			var infoLayer = new GraphicsLayer();
			map.addLayer(infoLayer);

			data.posts.forEach(post => {
				const symbol = new PictureMarkerSymbol("roads_info.png", 12, 12);
				const lat = post.latitude;
				const lng = post.longitude;
				var p = new Point(lng, lat);
				var graphic = new Graphic(p, symbol);

				var info = new InfoTemplate();
				info.setTitle("OK_MANNEN");
				graphic.setInfoTemplate(info);
				infoLayer.add(graphic);
			});
		}
	});
