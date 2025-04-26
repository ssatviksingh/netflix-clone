import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackParamList } from './BrowseStack';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

const { width } = Dimensions.get('window');

type MovieDetailRouteProp = RouteProp<StackParamList, 'MovieDetail'>;

const MovieDetail = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const { movie } = route.params as {
    movie: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      videoUrl: string;
    };
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
      videoRef.current?.unloadAsync();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <Image source={{ uri: movie.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        {!isPlaying ? (
          <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        ) : (
          <Video
            ref={videoRef}
            source={{ uri: movie.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            style={styles.video}
            useNativeControls
            shouldPlay
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            onError={(e: any) => console.log('Video error:', e)}
            isLooping
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  thumbnail: {
    width: width,
    height: width * 1.5,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  video: {
    width: width - 40,
    height: (width - 40) * (9 / 16),
    backgroundColor: '#000',
    marginTop: 20,
  },
});

export default MovieDetail;