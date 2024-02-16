import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const MapComponent = ({ lat, lng }) => (
  <div id="map" style={{ height: '400px' }}>
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.1}%2C${lat - 0.1}%2C${lng + 0.1}%2C${lat + 0.1}&amp;layer=mapnik`}
    />
  </div>
);

const Home = () => {
  const [joke, setJoke] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleAddToFavorite = async () => {
    if (joke) {
      setIsAddingToFavorites(true);

      setTimeout(async () => {
        setFavorites((prevFavorites) => [...prevFavorites, joke]);
        setIsAddingToFavorites(false);

        // Fetch a new joke and update the state
        try {
          const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
          setJoke(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, 500); // Adjust the duration of the animation as needed
    }
  };

  return (
    <div className="container">
      <h1>😄 Random Jokes 😄</h1>
      <button className="refreshButton" onClick={handleRefresh}>
        Refresh
      </button>
      {joke && (
        <div
          className={`jokeCard ${isAddingToFavorites ? 'scaleDown' : ''}`}
        >
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
          <button
            onClick={handleAddToFavorite}
            className="addToFavoritesButton"
          >
            <FontAwesomeIcon icon={faPlus} /> Add to Favorites
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favoritesContainer">
          <h2>Your Favorites 🌟</h2>
          {favorites.map((favorite, index) => (
            <div
              key={index}
              className={`favoriteCard ${isAddingToFavorites ? 'fade' : ''}`}
            >
              <h3>{favorite.setup}</h3>
              <p>{favorite.punchline}</p>
            </div>
          ))}
        </div>
      )}

      {/* OpenStreetMap Component */}
      {joke && <MapComponent lat={37.7749} lng={-122.4194} />}
    </div>
  );
};

export default Home;
