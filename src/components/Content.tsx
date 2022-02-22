import { useEffect, useState } from "react";
import { api } from '../services/api';

interface ContentProps {
  genre: {
    id: number;
    name: string;
    title: string;
  };
}
interface Movies {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

import { MovieCard } from './MovieCard';

export function Content({genre}: ContentProps) {

  const [movies, setMovies] = useState<Movies[]>([]);


  const getMovies = () => {
    api.get<Movies[]>(`movies/?Genre_id=${genre.id}`).then(response => {
      setMovies(response.data);
    });
  }

  useEffect(() => {
    getMovies();
  }, [genre]);

  useEffect(() => {
    getMovies();
  }, []);

  return (

    <div className="container">
    <header>
      <span className="category">Categoria:<span> {genre.title}</span></span>
    </header>
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  </div>
  )
}