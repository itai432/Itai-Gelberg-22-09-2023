import React from "react";
import { Typography, Container } from "@mui/material";
import CurrentWeather from "./CurrentWeather";

const WeatherDetails: React.FC = () => {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        width: "80vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        Search for a City
      </Typography>
      <CurrentWeather />
    </Container>
  );
};

export default WeatherDetails;
