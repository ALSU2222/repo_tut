import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';


const geoserver_addr = 'http://localhost:8080/geoserver';
// const geoserver_addr = '/geoserver';

// new TileLayer({
//   source: new TileWMS({
//     url: geoserver_addr + '/wms',
//     params: {'LAYERS': 'kras:water_poly', 'TILED': true, 'STYLES': 'kras:water_poly' },
//     serverType: 'geoserver',
//     transition: 0,
//   }),
// }),

function geoLayer(layer, style = '', name = layer) {
  var params = {}
  params['TILED'] = true;
  params['LAYERS'] = layer;
  params['STYLES'] = style;
  return new TileLayer({
    source: new TileWMS({
      url: geoserver_addr + '/wms',
      params: params,
      serverType: 'geoserver',
      transition: 0,
    }),
    name: name,
  });
}

const map = new Map({
  target: 'kras_map',
  layers: [
    new TileLayer({
      source: new OSM(),
      name: 'OSM',
    }),
    geoLayer('kras:water', 'kras:water_poly'),
    geoLayer('kras:build', 'kras:build_poly'),
    geoLayer('kras:border', 'kras:red_border'),

  ],

  view: new View({
    // center: [0, 0],
    center: fromLonLat([92.852572, 56.010569]),
    zoom: 11
  })
});

function switchVisibility() {
  for (let i = 0; i < map.getLayers("OSM").getArray().length; i++) {
    var l = map.getLayers("OSM").getArray()[i];
    // if(l.values_.name === "kras:border") l.setVisible(!l.getVisible());
    console.log(l.values_.name);
  }
}
document.querySelector('#listLayers').addEventListener('click', switchVisibility);

function toggleVisibility(layerName) {
  for (let i = 0; i < map.getLayers().getArray().length; i++) {
    var l = map.getLayers().getArray()[i];
    if(l.values_.name === layerName) {
      l.setVisible(!l.getVisible());
      break;
    }
  }
}

function toggleOSM() {
  toggleVisibility("OSM");
}

function toggleBorder() {
  toggleVisibility("kras:border");
}

function toggleWater() {
  toggleVisibility("kras:water");
}
function toggleBuild() {
  toggleVisibility("kras:build");
}

document.querySelector('#layerOSM').addEventListener('click', toggleOSM);
document.querySelector('#layerBorder').addEventListener('click', toggleBorder);
document.querySelector('#layerWater').addEventListener('click', toggleWater);
document.querySelector('#layerBuild').addEventListener('click', toggleBuild);