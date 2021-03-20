A simple app that loads a Landsat 8 image from Google Earth Engine into Open Layers. The visualization is the calculated NDVI for that image, with low values in red and high values in green.

![Landsat image showing NDVI](public/ndvi.jpg?raw=true)

## How to run:

`npm install && npm run start`

and then open http://localhost:3000.

You must provide a private key for authentication with Google Earth Engine. It should be a `privatekey.json` file on the app root folder.

This link shows how to generate a private key:
https://developers.google.com/earth-engine/guides/service_account#create-a-service-account
