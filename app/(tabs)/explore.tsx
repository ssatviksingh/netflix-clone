import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from './BrowseStack';
import { getPopularMovies } from '../../api/movieService';

const { width } = Dimensions.get('window');

const MovieItem = ({ item }: { item: { id: string; title: string; thumbnail: string; description: string; videoUrl: string } }) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.movieThumbnail} />
      <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
      <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('MovieDetail', { movie: item })}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [movies, setMovies] = useState<{ id: string; title: string; thumbnail: string; description: string; videoUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        if (!popularMovies || popularMovies.length === 0) {
          const mockedMovies = [
            { id: '1', title: 'Captain America: Brave New World', thumbnail: 'https://picsum.photos/200/300?random=1', description: 'Superhero action', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { id: '2', title: 'Sonic the Hedgehog 3', thumbnail: 'https://picsum.photos/200/300?random=2', description: 'Animated adventure', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4' },
            { id: '3', title: 'Mad Max: Fury Road', thumbnail: 'https://picsum.photos/200/300?random=3', description: 'Post-apocalyptic action', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { id: '4', title: 'John Wick 4', thumbnail: 'https://picsum.photos/200/300?random=4', description: 'Action thriller', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-waves-in-the-ocean-1164.mp4' },
            { id: '5', title: 'The Hangover', thumbnail: 'https://picsum.photos/200/300?random=5', description: 'Hilarious misadventure', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { id: '6', title: 'Superbad', thumbnail: 'https://picsum.photos/200/300?random=6', description: 'Teen comedy', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
            { id: '7', title: 'The Shawshank Redemption', thumbnail: 'https://picsum.photos/200/300?random=7', description: 'Inspirational drama', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
            { id: '8', title: 'Forrest Gump', thumbnail: 'https://picsum.photos/200/300?random=8', description: 'Emotional journey', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
            { id: '9', title: 'Dune', thumbnail: 'https://picsum.photos/200/300?random=9', description: 'Epic sci-fi saga', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
            { id: '10', title: 'Interstellar', thumbnail: 'https://picsum.photos/200/300?random=10', description: 'Space exploration', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
            { id: '11', title: 'The Woman in the Yard', thumbnail: 'https://picsum.photos/200/300?random=11', description: 'Terrifying tale', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-sea-waves-on-the-shore-1170.mp4' },
            { id: '12', title: 'A Knight\'s War', thumbnail: 'https://picsum.photos/200/300?random=12', description: 'Dark horror', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
          ];
          setMovies(mockedMovies);
        } else {
          setMovies(popularMovies);
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        const mockedMovies = [
          { id: '1', title: 'Captain America: Brave New World', thumbnail: 'https://picsum.photos/200/300?random=1', description: 'Superhero action', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { id: '2', title: 'Sonic the Hedgehog 3', thumbnail: 'https://picsum.photos/200/300?random=2', description: 'Animated adventure', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4' },
          { id: '3', title: 'Mad Max: Fury Road', thumbnail: 'https://picsum.photos/200/300?random=3', description: 'Post-apocalyptic action', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: '4', title: 'John Wick 4', thumbnail: 'https://picsum.photos/200/300?random=4', description: 'Action thriller', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-waves-in-the-ocean-1164.mp4' },
          { id: '5', title: 'The Hangover', thumbnail: 'https://picsum.photos/200/300?random=5', description: 'Hilarious misadventure', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: '6', title: 'Superbad', thumbnail: 'https://picsum.photos/200/300?random=6', description: 'Teen comedy', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: '7', title: 'The Shawshank Redemption', thumbnail: 'https://picsum.photos/200/300?random=7', description: 'Inspirational drama', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: '8', title: 'Forrest Gump', thumbnail: 'https://picsum.photos/200/300?random=8', description: 'Emotional journey', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: '9', title: 'Dune', thumbnail: 'https://picsum.photos/200/300?random=9', description: 'Epic sci-fi saga', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
          { id: '10', title: 'Interstellar', thumbnail: 'https://picsum.photos/200/300?random=10', description: 'Space exploration', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
          { id: '11', title: 'The Woman in the Yard', thumbnail: 'https://picsum.photos/200/300?random=11', description: 'Terrifying tale', videoUrl: 'https://assets.mixkit.co/videos/download/mixkit-sea-waves-on-the-shore-1170.mp4' },
          { id: '12', title: 'A Knight\'s War', thumbnail: 'https://picsum.photos/200/300?random=12', description: 'Dark horror', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        ];
        setMovies(mockedMovies);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Browse Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.browseList}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  browseList: {
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  movieItem: {
    marginBottom: 10,
    width: width * 0.45,
    alignItems: 'center',
  },
  movieThumbnail: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    width: '100%',
  },
  playButton: {
    backgroundColor: '#E50914',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
});

export default ExploreScreen;