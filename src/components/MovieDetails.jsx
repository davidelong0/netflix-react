import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Alert, Spinner, Row, Col, Button, Card } from 'react-bootstrap';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=ffc5637c`);
        const movieData = await movieResponse.json();
        
        if (movieData.Response === 'True') {
          setMovie(movieData);
        } else {
          setError({ movie: 'Error fetching movie details' });
        }

        const commentsResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y2ODI5ZDk3YmYyZjAwMTU0OTZkMDkiLCJpYXQiOjE3NDQyMDg1NDEsImV4cCI6MTc0NTQxODE0MX0.VLR-8psLuhneoxMyR8Vq9KwDznJs4HR-IqT-nF2AMRU"
          }
        });
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

      } catch (err) {
        setError({ general: 'An error occurred during fetching.' });
        console.error("Errore durante il fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="visually-hidden">Loading...</span>
      </Container>
    );
  }

  if (error.general) {
    return (
      <Container>
        <Alert variant="danger" className="text-center mt-5">
          {error.general}
        </Alert>
      </Container>
    );
  }

  if (error.movie) {
    return (
      <Container>
        <Alert variant="danger" className="text-center mt-5">
          {error.movie}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={4} className="text-center">
          <Card className="movie-detail-card">
            <Card.Img variant="top" src={movie.Poster} alt={movie.Title} className="img-fluid" />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text><strong>Year:</strong> {movie.Year}</Card.Text>
              <Card.Text><strong>Genre:</strong> {movie.Genre}</Card.Text>
              <Card.Text><strong>Plot:</strong> {movie.Plot}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h4 className="text-white">Comments</h4>
          {comments.length > 0 ? (
            <ul className="list-unstyled">
              {comments.map((comment) => (
                <li key={comment._id}>
                  <div className="comment-card">
                    <p><strong>{comment.author}</strong></p>
                    <p>{comment.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No comments available for this movie.</p>
          )}
        </Col>
      </Row>
      <Button onClick={() => window.history.back()} className="mt-4">Back to Movies</Button>
    </Container>
  );
};

export default MovieDetails;
