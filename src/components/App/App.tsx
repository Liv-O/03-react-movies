import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';

import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (title: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);

      const data = await fetchMovies(title);

      if (data.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  function handleSelect(movie: Movie) {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  }
  function closeModal() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}

      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={handleSelect}
        />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
