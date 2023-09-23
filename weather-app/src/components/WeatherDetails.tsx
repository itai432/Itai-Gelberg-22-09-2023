import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import CurrentWeather from "./CurrentWeather";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  textSecondary: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  weatherInfo: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  weatherIcon: {
    fontSize: 48, // Adjust the size as needed
  },
}));

const WeatherDetails: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.heading} gutterBottom>
        Search for a City
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CurrentWeather />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherDetails;