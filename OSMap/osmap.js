var map, pinMarker, openCasesMarkers;
var osmapTemplateIdentifier = 'osmap_template_';
proj4.defs([
		[
			'EPSG:4326',
			'+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'],
		[
			'EPSG:27700',
			'+title=OSGB 1936 / British National Grid (UTM) +proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs'
		]
	]);

function do_KDF_Ready_OSMap(event, kdf) {
	map = L.map('map').setView([51.653046, -0.089580], 12);

	L.tileLayer('https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor%203857/{z}/{x}/{y}.png?key=Y7CTxkXcd66CoBs2ry7I1QAOkZAomw82', {
		maxZoom: 20,
		minZoom: 7
	}).addTo(map);
	map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
	
	// Add legend to the map - Start
	var legend_icons = [
		{label:"Current Location", url:"https://unpkg.com/leaflet@1.0.0/dist/images/marker-icon.png"},
		{label:"Open Issue", url:"https://ver-dev-workings.github.io/files/OSMap/resources/content/map-blue.png"}
	];
	if (legend_icons.length > 0) {
		var legend = L.control({position: 'topright'});
		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend');

			// loop through list of icons
			for (var i = 0; i < legend_icons.length; i++) {
				div.innerHTML +=
					("<img src="+ legend_icons[i].url +" alt='"+legend_icons[i].label+"' style='width:30px;height:30px;vertical-align:middle;'>") + legend_icons[i].label + '<br>';
			}

			return div;
		};
		legend.addTo(map);
	}
	// Add legend to the map - End

	//Add the Boundary KML file as a layer
	var boundaryLayer = new L.KML("https://ver-dev-workings.github.io/files/OSMap/KML/EnfieldBoroughBoundary.kml", {
			async: true
		});
	boundaryLayer.on("loaded", function (e) {
		map.fitBounds(e.target.getBounds());
		lines = e.target.latLngs;
		enfield_polygon = L.polyline(lines, {
				color: 'red'
			}).addTo(map);
	});
	map.addLayer(boundaryLayer);

	// Pre-set the pin marker when the form is loaded
	if (KDF.getVal('le_gis_lat') !== '' && KDF.getVal('le_gis_lon') !== '') {
		pinMarker = new L.marker([KDF.getVal('le_gis_lat'), KDF.getVal('le_gis_lon')], {
				interactive: true
			});
		pinMarkers = L.layerGroup([pinMarker]);
		map.removeLayer(pinMarkers);

		var popup = L.popup().setContent(KDF.getVal('txt_map_full_address'));
		pinMarker.addTo(map).bindPopup(popup).openPopup();

		map.setView([KDF.getVal('le_gis_lat'), KDF.getVal('le_gis_lon')], 18);
	}

	// Ensure map cannot be clicked on Read mode.
	if (KDF.getVal('rad_viewmode') !== 'R') {
		map.on("click", function (event) {
			var clickedMarker = event;
			//console.log(event)

			var lat = clickedMarker.latlng.lat;
			var lon = clickedMarker.latlng.lng;
			// real_Lat = real_Lat.toString().substring(0,9);
			//console.log(real_Lat)

			console.log("Perform Reverse Geocode");
			console.log("Lat : ", lat);
			console.log("Lon :", lon);

			if (pinMarker !== undefined) {
				map.removeLayer(pinMarker);
			}

			pinMarker = new L.marker([lat, lon], {
					interactive: true
				});
			pinMarkers = L.layerGroup([pinMarker]);
			map.removeLayer(pinMarkers);
			//map.addLayer(pinMarkers);

			//if (enfield_polygon.getBounds().contains([lat, lon])) {
			if (inside([lon, lat], enfield_polygon)) {
				KDF.setVal('le_gis_lon', lon);
				KDF.setVal('le_gis_lat', lat);
				map.setView([lat, lon], 18);

				// OS Places API need format in British National Grid (EPSG:27700)
				var coor = proj4('EPSG:4326', 'EPSG:27700', [lon, lat]);
				KDF.customdata('reverse_geocode', osmapTemplateIdentifier + 'on_click', true, true, {
					'longitude': coor[0].toString(),
					'latitude': coor[1].toString()
				});
			} else {
				var popup = L.popup()
					.setContent('You can\'t drop a pin here as it\'s outside the London Borough of Enfield. <a href="https://www.gov.uk/find-your-local-council" target="_blank">Find out which council you should contact about this problem.<\/a>');

				pinMarker.addTo(map).bindPopup(popup).openPopup();
			}
		});
	}

	map.on("moveend", function (event) {
		console.log('Zoom level:', map.getZoom());
		var xmin = map.getBounds().getWest();
		var xmax = map.getBounds().getEast();
		var ymin = map.getBounds().getSouth();
		var ymax = map.getBounds().getNorth();

		console.log('Map extend:', xmin, xmax, ymin, ymax);
		if (map.getZoom() >= 14) {
			KDF.customdata('get_open_case_marker', osmapTemplateIdentifier + 'kdf_ready', true, false, {
				'le_eventcode': '4100009',
				'xmin': xmin.toString(),
				'xmax': xmax.toString(),
				'ymin': ymin.toString(),
				'ymax': ymax.toString()
			});
		}
	});
	// KDF_ready for map - End
}

function do_KDF_Custom_OSMap(event, kdf, response, action, actionedby) {
	var isOSMapTemplate = false;

	if (response.actionedby.indexOf(osmapTemplateIdentifier) === 0) {
		isOSMapTemplate = true;
	}
	console.log('is OSMap template ? ', isOSMapTemplate);

	if (isOSMapTemplate) {
		var actionedBySource = response.actionedby.replace(osmapTemplateIdentifier, '');
		console.log('Actioned by source :', actionedBySource);

		// KDF_custom for map - Start
		if (action === 'retrieve_property') {
			var coor = proj4('EPSG:27700', 'EPSG:4326', [response.data.easting, response.data.northing]);
			console.log("Coor :", coor);

			var lat,lon;
			lon = coor[0];
			lat = coor[1];

			KDF.setVal('le_gis_lon', lon);
			KDF.setVal('le_gis_lat', lat);
			KDF.setVal('le_associated_obj_id', response.data.object_id);
			KDF.setVal('txt_map_uprn', response.data.UPRN);
			KDF.setVal('txt_map_full_address', response.data.description);

			if (pinMarker !== undefined) {
				map.removeLayer(pinMarker);
			}

			map.setView([lat, lon], 18);
			pinMarker = new L.marker([lat, lon], {
					interactive: true
				});

			var popup = L.popup().setContent(response.data.description);
			pinMarker.addTo(map).bindPopup(popup).openPopup();
		} else if (action === 'reverse_geocode') {
			if (response.data.outcome === 'success') {
				KDF.setVal('le_associated_obj_id', response.data.object_id);
				KDF.setVal('txt_map_uprn', response.data.UPRN);
				KDF.setVal('txt_map_full_address', response.data.description);
			}
			var popup = L.popup().setContent(response.data.description);
			pinMarker.addTo(map).bindPopup(popup).openPopup();
		} else if (action === 'get_open_case_marker') {
			var markers = [];

			if (openCasesMarkers !== undefined) {
				openCasesMarkers.clearLayers();
			}

			response.data.forEach(function (marker) {
				var icon = L.icon({
						iconUrl: marker.icon,
						iconAnchor: [15, 7]// point of the icon which will correspond to marker's location
					});
				markers.push(L.marker([marker.latitude, marker.longitude], {
						icon: icon,
						interactive: true
					}).bindPopup(KDF.getVal('le_title') + ' ' + marker.title + '<br/>' + marker.description));
			});

			openCasesMarkers = L.layerGroup(markers).addTo(map);
		}
		//KDF_custom for map - End
	}
}

function do_KDF_optionSelected_OSMap(event, kdf, field, label, val) {
	// KDF_optionSelected for map - Start
	if (field === "ps_property_search_map_id") {
		KDF.customdata('retrieve_property', osmapTemplateIdentifier + 'create', true, true, {
			'object_id': val
		});
	}
	// KDF_optionSelected for map - End
}

/*
The MIT License (MIT)

Copyright (c) 2016 James Halliday

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
function inside(point, poly) {
	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

	var inside = false;
	var x = point[0],
	y = point[1];
	var polyPoints = poly.getLatLngs();
	for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
		var xi = polyPoints[i].lng,
		yi = polyPoints[i].lat;
		var xj = polyPoints[j].lng,
		yj = polyPoints[j].lat;

		var intersect = ((yi > y) != (yj > y))
		 && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect)
			inside = !inside;
	}

	return inside;
}
