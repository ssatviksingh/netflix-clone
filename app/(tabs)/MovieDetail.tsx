import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "./HomeStack";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Get screen width and height
const { width, height } = Dimensions.get("window");

// Define type for route props
type MovieDetailRouteProp = RouteProp<StackParamList, "MovieDetail">;

type Props = {
  route: MovieDetailRouteProp;
};

const MovieDetail = ({ route }: Props) => {
  const { movie } = route.params;

  // Local state management
  const [isPlaying, setIsPlaying] = useState(false); // For playing trailer
  const [isMoviePlaying, setIsMoviePlaying] = useState(false); // For playing full movie
  const [isLoading, setIsLoading] = useState(false); // For showing loading spinner

  // Handle play trailer button
  const handlePlayPress = () => {
    setIsPlaying(true);
    setIsMoviePlaying(false);
    setIsLoading(true);
  };

  // Handle play full movie button
  const handleMoviePlayPress = () => {
    if (movie.fullMovieUrl) {
      setIsPlaying(false);
      setIsMoviePlaying(true);
      setIsLoading(true);
    } else {
      Alert.alert("Full movie not available.");
    }
  };

  // Convert a YouTube URL into an embeddable link
  const getEmbedUrl = (url: string | null) => {
    if (!url) return null;
    const videoId = url.split("v=")[1]?.split("&")[0];
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;
  };

  const embedUrl = getEmbedUrl(movie.videoUrl);

  return (
    <View style={styles.container}>
      {/* Set status bar style */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Thumbnail Image with Gradient overlay */}
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: movie.thumbnail }} style={styles.thumbnail} />
          <LinearGradient
            colors={["transparent", "#141414"]}
            style={styles.gradientOverlay}
          />
        </View>

        {/* Movie content section */}
        <View style={styles.content}>
          {/* Movie Title */}
          <Text style={styles.title}>{movie.title}</Text>

          {/* Metadata */}
          <View style={styles.metadata}>
            <Text style={styles.metadataText}>
              1h 32m • R • Action, Thriller
            </Text>
          </View>

          {/* Movie Description */}
          <Text style={styles.description}>{movie.description}</Text>

          {/* Trailer or Movie Video */}
          {movie.videoUrl ? (
            isPlaying || isMoviePlaying ? (
              <View style={styles.videoContainer}>
                {/* Show loading indicator while video loads */}
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#E50914" />
                  </View>
                )}
                {/* Video Player */}
                <WebView
                  style={styles.video}
                  source={{
                    uri: isMoviePlaying
                      ? movie.fullMovieUrl || ""
                      : embedUrl || "",
                  }}
                  allowsFullscreenVideo
                  javaScriptEnabled
                  domStorageEnabled
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  onLoad={() => setIsLoading(false)}
                  onError={(error) => {
                    console.error("WebView error:", error);
                    setIsLoading(false);
                  }}
                />
              </View>
            ) : (
              <>
                {/* Play Trailer Button */}
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPress}
                >
                  <Ionicons
                    name="play"
                    size={20}
                    color="#000"
                    style={styles.playIcon}
                  />
                  <Text style={styles.playButtonText}>Play Trailer</Text>
                </TouchableOpacity>

                {/* Play Full Movie Button */}
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    { backgroundColor: "#E50914", marginTop: 10 },
                  ]}
                  onPress={handleMoviePlayPress}
                >
                  <Ionicons
                    name="film"
                    size={20}
                    color="#fff"
                    style={styles.playIcon}
                  />
                  <Text style={[styles.playButtonText, { color: "#fff" }]}>
                    Play Movie
                  </Text>
                </TouchableOpacity>
              </>
            )
          ) : (
            // No trailer available message
            <Text style={styles.noTrailerText}>
              No trailer available for this movie.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Styles for the MovieDetail screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  scrollContent: {
    paddingTop: 0,
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    height: height * 0.4,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  metadata: {
    flexDirection: "row",
    marginBottom: 12,
  },
  metadataText: {
    fontSize: 14,
    color: "#ccc",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
    marginBottom: 20,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  playIcon: {
    marginRight: 8,
  },
  playButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  videoContainer: {
    width: "100%",
    height: (width * 9) / 16, // 16:9 aspect ratio
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  noTrailerText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default MovieDetail;
