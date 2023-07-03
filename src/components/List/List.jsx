import React, { useState, useEffect, useRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

const List = ({
  places,
  type,
  setType,
  rating,
  setRating,
  childClicked,
  isLoading,
}) => {
  const elRefs = useRef([]);

  const classes = useStyles();

  useEffect(() => {
    elRefs.current = Array(places?.length || 0).fill().map(
      (_, i) => elRefs.current[i] || React.createRef()
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              labelId="rating"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {Array.isArray(places) && places.length > 0 ? (
              places.map((place, i) => (
                <Grid ref={elRefs.current[i]} key={i} item xs={12}>
                  <PlaceDetails
                    selected={childClicked === i}
                    refProp={elRefs.current[i]}
                    place={place}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle1">No places found</Typography>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
