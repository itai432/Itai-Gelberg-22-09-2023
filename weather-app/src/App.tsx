import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import WeatherDetails from "./components/WeatherDetails";
import Favorites from "./components/Favorites";
import Header from "./components/Header";

import { Provider } from "react-redux";
import store from "./store/store";
const theme = createTheme();

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box maxWidth="100%" margin="0 auto" padding="2rem" textAlign="center">
          <Routes>
            <Route path="/" element={<WeatherDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  </Provider>
);

export default App;
