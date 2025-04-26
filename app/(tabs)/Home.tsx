import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getPopularMovies } from '../../api/movieService'; 
import { StackParamList } from './HomeStack'; 

// ✅ Define types here so no external imports break
type TMDBMovie = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

type Movie = TMDBMovie & {
  videoUrl: string;
};

type SectionData = {
  title: string;
  data: Movie[];
  isFeatured?: boolean;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();

        if (popularMovies && popularMovies.length > 0) {
          const mappedMovies: Movie[] = popularMovies.map(
            (movie: TMDBMovie, index: number) => ({
              id: movie.id || index.toString(),
              title: movie.title,
              thumbnail: movie.thumbnail,
              description: movie.description,
              videoUrl:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            })
          );

          const uniqueMovies = Array.from(
            new Map(
              mappedMovies.map((movie) => [movie.title + movie.id, movie])
            ).values()
          );

          const featuredMovies = uniqueMovies.slice(0, 8);
          const genreMovies = uniqueMovies.reduce(
            (
              acc: {
                [key in 'Action' | 'Comedy' | 'Drama' | 'Sci-Fi' | 'Horror']: Movie[];
              },
              movie: Movie
            ) => {
              const genre = assignGenre(movie);
              if (!acc[genre].some((m) => m.id === movie.id)) {
                acc[genre].push(movie);
              }
              return acc;
            },
            { Action: [], Comedy: [], Drama: [], 'Sci-Fi': [], Horror: [] }
          );

          const sectionsData: SectionData[] = [
            { title: 'Featured Movies', data: featuredMovies, isFeatured: true },
            { title: 'Action', data: genreMovies.Action },
            { title: 'Comedy', data: genreMovies.Comedy },
            { title: 'Drama', data: genreMovies.Drama },
            { title: 'Sci-Fi', data: genreMovies['Sci-Fi'] },
            { title: 'Horror', data: genreMovies.Horror },
          ].filter((section) => section.data.length > 0);

          setSections(sectionsData);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const assignGenre = (
    movie: Movie
  ): 'Action' | 'Comedy' | 'Drama' | 'Sci-Fi' | 'Horror' => {
    const title = movie.title.toLowerCase();
    if (
      title.includes('action') ||
      title.includes('captain') ||
      title.includes('lost') ||
      title.includes('g20') ||
      title.includes('gunslingers') ||
      title.includes('knight') ||
      title.includes('cleaner')
    )
      return 'Action';
    if (
      title.includes('comedy') ||
      title.includes('minecraft') ||
      title.includes('laila') ||
      title.includes('mickey')
    )
      return 'Comedy';
    if (
      title.includes('drama') ||
      title.includes('passion') ||
      title.includes('sinners') ||
      title.includes('codes') ||
      title.includes('mufasa')
    )
      return 'Drama';
    if (
      title.includes('sci-fi') ||
      title.includes('moana') ||
      title.includes('sonic') ||
      title.includes('carjackers')
    )
      return 'Sci-Fi';
    if (
      title.includes('horror') ||
      title.includes('yard') ||
      title.includes('rebirth') ||
      title.includes('novocaine')
    )
      return 'Horror';

    const randomGenre = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'][
      Math.floor(Math.random() * 5)
    ] as 'Action' | 'Comedy' | 'Drama' | 'Sci-Fi' | 'Horror';
    return randomGenre;
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image
        source={{
          uri: item.thumbnail || 'https://via.placeholder.com/200x300',
        }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, idx) => (
        <View key={idx} style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              section.isFeatured ? { color: '#E50914' } : {},
            ]}
          >
            {section.title}
          </Text>
          <FlatList
            horizontal
            data={section.data}
            renderItem={renderMovie}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  sectionContainer: {
    marginVertical: 16,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  movieItem: {
    width: 120,
    marginRight: 10,
  },
  movieImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
});