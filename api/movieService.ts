// api/movieService.ts
import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from './config';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results.map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
    }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data.results.map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId: number, genreName: string) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results.slice(0, 10).map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      description: movie.overview,
      genre: genreName,
    }));
  } catch (error) {
    console.error(`Error fetching ${genreName} movies:`, error);
    return [];
  }
};

// TMDB Genre IDs: https://developers.themoviedb.org/3/genres/get-movie-list
export const fetchMovieSections = async () => {
  const sectionPromises = [
    { title: 'Trending Now', movies: getTrendingMovies() },
    { title: 'Action', movies: getMoviesByGenre(28, 'Action') },
    { title: 'Comedy', movies: getMoviesByGenre(35, 'Comedy') },
    { title: 'Drama', movies: getMoviesByGenre(18, 'Drama') },
    { title: 'Sci-Fi', movies: getMoviesByGenre(878, 'Science Fiction') },
    { title: 'Horror', movies: getMoviesByGenre(27, 'Horror') },
  ];

  const resolvedSections = await Promise.all(
    sectionPromises.map(async (section) => ({
      title: section.title,
      movies: await section.movies, // Resolve each movie promise
    }))
  );

  return resolvedSections;
};