const express = require("express");
const ee = require("@google/earthengine");

const privateKey = require("./privatekey.json");

const app = express();
const port = 3000;

ee.data.authenticateViaPrivateKey(
  privateKey,
  () => ee.initialize(),
  (e) => console.error(`Authentication error:  ${e}`)
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/get_image", (req, res) => {
  const image = ee
    .ImageCollection("LANDSAT/LC08/C01/T1_TOA")
    .filterDate("2019-01-01", "2020-01-01")
    .filterBounds(ee.Geometry.Point([-45.75, -13.02]))
    .limit(1, "CLOUD_COVER")
    .first();

  const ndvi = image.normalizedDifference(["B5", "B4"]).rename("NDVI");

  const mapId = ndvi.getMap({
    bands: ["NDVI"],
    palette: ["RED", "ORANGE", "YELLOW", "GREEN"],
    min: 0,
    max: 0.7,
  });

  res.json({ url: mapId.urlFormat });
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));
