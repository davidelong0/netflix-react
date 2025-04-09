import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import MovieList from './components/MovieList';
import TVShows from './components/TVShows'; 
import MovieDetails from './components/MovieDetails';

const App = () => {
  const [gallery1, setGallery1] = useState([]);
  const [gallery2, setGallery2] = useState([]);
  const [gallery3, setGallery3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const OMDB_URL = 'https://www.omdbapi.com/?apikey=ffc5637c';

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    Promise.all([
      fetch(OMDB_URL + '&s=harry%20potter')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery1(responseObject.Search);
          } else {
            setError({ gallery1: 'Error fetching Harry Potter movies' });
          }
        }),
      fetch(OMDB_URL + '&s=avengers')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery2(responseObject.Search);
          } else {
            setError({ gallery2: 'Error fetching Avengers movies' });
          }
        }),
      fetch(OMDB_URL + '&s=star%20wars')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery3(responseObject.Search);
          } else {
            setError({ gallery3: 'Error fetching Star Wars movies' });
          }
        }),
    ])
      .then(() => setLoading(false))
      .catch((err) => {
        setError({ general: 'An error has occurred' });
        console.log('An error has occurred:', err);
      });
  };

  return (
    <Router>
      <MyNavbar />
      <Container fluid className="px-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <h2 className="mb-4">Home</h2>
                  </div>
                </div>
                {error.general && (
                  <Alert variant="danger" className="text-center">
                    {error.general}
                  </Alert>
                )}
                {error.gallery1 && (
                  <Alert variant="danger" className="text-center">
                    {error.gallery1}
                  </Alert>
                )}
                {error.gallery2 && (
                  <Alert variant="danger" className="text-center">
                    {error.gallery2}
                  </Alert>
                )}
                {error.gallery3 && (
                  <Alert variant="danger" className="text-center">
                    {error.gallery3}
                  </Alert>
                )}
                {!error.general && !error.gallery1 && !error.gallery2 && !error.gallery3 && (
                  <>
                    <MovieList
                      title="Harry Potter"
                      loading={loading}
                      movies={gallery1.slice(0, 6)}
                    />
                    <MovieList
                      title="Avengers"
                      loading={loading}
                      movies={gallery2.slice(0, 6)}
                    />
                    <MovieList
                      title="Star Wars"
                      loading={loading}
                      movies={gallery3.slice(0, 6)}
                    />
                  </>
                )}
              </>
            }
          />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
        <MyFooter />
      </Container>
    </Router>
  );
};

export default App;
