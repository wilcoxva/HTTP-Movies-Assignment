import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const {id} = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => history.push(`/update-movie/${id}`)}>
        Edit
      </button> 
      <button onClick={deleteMovie}>
        Delete
      </button>      

    </div>
  );
}

export default Movie;
