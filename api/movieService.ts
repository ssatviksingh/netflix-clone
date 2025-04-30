import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from './config';

// Create a reusable axios instance configured for TMDB API
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

// Fetch the best available video URL (Trailer > Teaser > any YouTube video) for a given movie
const getVideoUrl = async (movieId: string) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    const videos = response.data.results;
    console.log(`Videos for movie ID ${movieId}:`, videos);

    // Prioritize Trailer, then Teaser, then any YouTube video
    const trailer = videos.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube') ??
                    videos.find((video: any) => video.type === 'Teaser' && video.site === 'YouTube') ??
                    videos.find((video: any) => video.site === 'YouTube');

    const videoUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    console.log(`Selected video URL for movie ID ${movieId}:`, videoUrl);

    return videoUrl;
  } catch (error) {
    console.error(`Error fetching video for movie ID ${movieId}:`, error);
    return null;
  }
};

// Fetch popular movies from TMDB, attach their video URLs
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
          videoUrl: videoUrl, // Attach video URL or keep null
        };
      })
    );
    return movies;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch trending movies of the week from TMDB, attach their video URLs
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
          videoUrl: videoUrl, // Attach video URL or keep null
        };
      })
    );
    return movies;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Fetch movies by genre, attach their video URLs, and limit to 10 movies
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
          videoUrl: videoUrl, // Attach video URL or keep null
        };
      })
    );
    return movies;
  } catch (error) {
    console.error(`Error fetching ${genreName} movies:`, error);
    return [];
  }
};

// Fetch all movie sections (Trending + several genres) with their movies
export const fetchMovieSections = async () => {
  // Define the sections and corresponding movie fetch operations
  const sectionPromises = [
    { title: 'Trending Now', movies: getTrendingMovies() },
    { title: 'Action', movies: getMoviesByGenre(28, 'Action') },
    { title: 'Comedy', movies: getMoviesByGenre(35, 'Comedy') },
    { title: 'Drama', movies: getMoviesByGenre(18, 'Drama') },
    { title: 'Sci-Fi', movies: getMoviesByGenre(878, 'Science Fiction') },
    { title: 'Horror', movies: getMoviesByGenre(27, 'Horror') },
  ];

  // Resolve all section promises
  const resolvedSections = await Promise.all(
    sectionPromises.map(async (section) => ({
      title: section.title,
      movies: await section.movies,
    }))
  );

  return resolvedSections;
};
