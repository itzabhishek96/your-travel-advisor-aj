import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import mapStyles from "../../mapStyles";
import useStyles from "./styles.js";

const Map = ({
  coords,
  places,
  setCoords,
  setBounds,
  setChildClicked,
  weatherData,
}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

  const handleApiLoaded = (map, maps) => {
    // Use the map and maps objects from the Google Maps JavaScript API
    // You can perform any additional operations or configurations here
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          libraries: ["places"], 
        }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
        onChildClick={(child) => setChildClicked(child)}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {Array.isArray(places) &&
          places.length > 0 &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
                    }
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="100px"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;


