import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../slices/favoritesSlice";
import { FavoritesState } from "../slices/favoritesSlice";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CardHeader,
  Divider,
  Autocomplete,
  Grid,
} from "@mui/material";

const CurrentWeather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: { favorites: FavoritesState }) => state.favorites.favorites
  );

  const getWeather = async () => {
    try {
      setError("");
      const baseUrl = "http://dataservice.accuweather.com";
      const apiKey = "W33MYdXJvdRA78pgMkRgPyx1md4D1sMo";

      const searchResponse = await axios.get(
        `${baseUrl}/locations/v1/cities/search?q=${city}&apikey=${apiKey}`
      );

      console.log(searchResponse.data); // Log the response data

      if (
        !Array.isArray(searchResponse.data) ||
        searchResponse.data.length === 0
      ) {
        setError("City not found.");
        return;
      }

      const locationKey = searchResponse.data[0].Key;

      const weatherResponse = await axios.get(
        `${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}`
      );

      if (
        !Array.isArray(weatherResponse.data) ||
        weatherResponse.data.length === 0
      ) {
        setError("Weather data not found for the city.");
        return;
      }

      setWeather(weatherResponse.data[0]);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error: ${error.response?.data.Message} (status code: ${error.response?.status})`
        );
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  const handleSearch = () => {
    if (city) getWeather();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const handleAutocomplete = async (value: string) => {
    const baseUrl = "http://dataservice.accuweather.com";
    const apiKey = "W33MYdXJvdRA78pgMkRgPyx1md4D1sMo";

    try {
      const response = await axios.get(
        `${baseUrl}/locations/v1/cities/autocomplete?q=${value}&apikey=${apiKey}`
      );
      setOptions(response.data.map((location: any) => location.LocalizedName));
    } catch (error: any) {
      console.error("Error fetching autocomplete results", error);
    }
  };

  const handleAddToFavorites = useCallback(() => {
    if (weather && city) {
      const isCityInFavorites = favorites.some(
        (favorite) => favorite.city === city
      );

      if (isCityInFavorites) {
        console.warn(`${city} is already in the favorites`);
      } else {
        dispatch(addFavorite({ city, weather }));
      }
    }
  }, [city, weather, dispatch, favorites]);
  return (
    <Grid width={"50vw"} container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Box textAlign="center" mt={2}>
          <Autocomplete
            freeSolo
            options={options}
            onInputChange={(_, newValue) => {
              setCity(newValue);
              if (newValue) handleAutocomplete(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="City"
                variant="outlined"
                placeholder="Enter City Name"
              />
            )}
          />
          <Box display="flex" justifyContent="center" mt={2} gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
            {weather && (
              <Button variant="contained" color="secondary" onClick={handleAddToFavorites}>
                Add to Favorites
              </Button>
            )}
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {weather && (
            <Card elevation={3} sx={{ mt: 2 }}>
              <CardHeader title="Weather Details" />
              <Divider />
              <CardContent>
                <Typography variant="h6" component="div">
                  {formatDate(weather.LocalObservationDateTime)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                  {weather.WeatherText}
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  {Math.round(weather.Temperature.Metric.Value)}°C
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CurrentWeather;