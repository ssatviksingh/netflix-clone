import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from './config';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

const getVideoUrl = async (movieId: string) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    const videos = response.data.results;
    console.log(`Videos for movie ID ${movieId}:`, videos); // Debug log
    // Prioritize Trailer, then Teaser, then any YouTube video
    const trailer = videos.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube') ??
                   videos.find((video: any) => video.type === 'Teaser' && video.site === 'YouTube') ??
                   videos.find((video: any) => video.site === 'YouTube');
    const videoUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    console.log(`Selected video URL for movie ID ${movieId}:`, videoUrl); // Debug log
    return videoUrl;
  } catch (error) {
    console.error(`Error fetching video for movie ID ${movieId}:`, error);
    return null;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular');
    const movies = await Promise.all(
      response.data.results.map(async (movie: any) => {
        const videoUrl = await getVideoUrl(movie.id.toString());
        return {
          id: movie.id.toString(),
          title: movie.title,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          videoUrl: videoUrl, // No fallback, keep as null if not found
        };
      })
    );
    return movies;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    const movies = await Promise.all(
      response.data.results.map(async (movie: any) => {
        const videoUrl = await getVideoUrl(movie.id.toString());
        return {
          id: movie.id.toString(),
          title: movie.title,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          videoUrl: videoUrl, // No fallback, keep as null if not found
        };
      })
    );
    return movies;
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
    const movies = await Promise.all(
      response.data.results.slice(0, 10).map(async (movie: any) => {
        const videoUrl = await getVideoUrl(movie.id.toString());
        return {
          id: movie.id.toString(),
          title: movie.title,
          thumbnail: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          genre: genreName,
          videoUrl: videoUrl, // No fallback, keep as null if not found
        };
      })
    );
    return movies;
  } catch (error) {
    console.error(`Error fetching ${genreName} movies:`, error);
    return [];
  }
};

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
      movies: await section.movies,
    }))
  );

  return resolvedSections;
};