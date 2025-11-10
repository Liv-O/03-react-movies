import axios from 'axios';

import type { Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
}

const fetchMovies = async (title: string): Promise<Movie[]> => {
  const getParams = {
    params: {
      query: title,
      // твої параметри
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    getParams
  );
  return response.data.results;
};

export default fetchMovies;
