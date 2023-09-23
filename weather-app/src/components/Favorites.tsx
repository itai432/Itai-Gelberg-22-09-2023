import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Box // Importing Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; 
import { removeFavorite } from '../slices/favoritesSlice'; 

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const handleClearFavorite = (city: string) => {
    dispatch(removeFavorite(city));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      {favorites.length === 0 && (
        <Typography variant="subtitle1" gutterBottom>
          No Favorites Added
        </Typography>
      )}
      <Box display="flex" flexDirection="column" alignItems="center"> {/* Wrapping your cards with Box to center them */}
        {favorites.map((favorite, index) => (
          <Card key={index} elevation={3} sx={{ mb: 2, width: '300px', fontSize: '0.8rem' }}>
            <CardHeader title={favorite.city} sx={{ fontSize: '1rem', paddingBottom: '0px' }} />
            <Divider />
            <CardContent sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <Typography variant="body2" component="div">
                {formatDate(favorite.weather.LocalObservationDateTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                {favorite.weather.WeatherText}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClearFavorite(favorite.city)}
                sx={{ mt: 2, fontSize: '0.7rem' }}
              >
                Clear
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default Favorites;