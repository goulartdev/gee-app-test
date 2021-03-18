const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-45.75, -13.02]),
    zoom: 8,
  }),
});

const getImage = async () => {
  const response = await fetch("/get_image");
  const { url } = await response.json();

  console.log(url);

  const geeTileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({ url }),
  });

  map.addLayer(geeTileLayer);
};

getImage();
