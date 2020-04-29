 var raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        var source = new ol.source.Vector();

        var vector = new ol.layer.Vector({
            source: source
        });

        var map = new ol.Map({
			//keeps the user from moving the map around
			interactions: ol.interaction.defaults({mouseWheelZoom:false,
			doubleClickZoom: false,
			dragAndDrop: false,
			dragPan: false,
			keyboardPan: false,
			keyboardZoom: false}),
            layers: [
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					url : 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
					'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
				})
			}),vector],
            target: 'map',
            view: new ol.View({
              center: ol.proj.fromLonLat([-118.734955,37.223817]),
              zoom: 17
            })
			
        });

var endPoint = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([-118.734857,37.224553]))
             })
         ]
     })
 });
 map.addLayer(endPoint);
 
var startPoint = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([-118.734891,37.221886]))
             })
         ]
     })
 });
 map.addLayer(startPoint);
 
var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if( value == 'None'){
	  
  }
  else if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source,
      type: typeSelect.value,
      freehand: true
    });
    map.addInteraction(draw);
  }
}


/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};



//"Saves" the feature drawn on the map
function getfeatures(){
	var GEOJSON_PARSER = new ol.format.GeoJSON();
	var geojsonStr = GEOJSON_PARSER.writeFeatures(source.getFeatures());
	//print the GeoJSON to the console
	console.log(geojsonStr);
	//update to save to a file
}  
addInteraction();

//clears drawn features on the map
function remove(){
	source.clear();
}
