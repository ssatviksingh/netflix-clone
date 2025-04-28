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
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "./HomeStack";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type MovieDetailRouteProp = RouteProp<StackParamList, "MovieDetail">;

type Props = {
  route: MovieDetailRouteProp;
};

const MovieDetail = ({ route }: Props) => {
  const { movie } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPress = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (url: string | null) => {
    if (!url) return null;
    const videoId = url.split("v=")[1]?.split("&")[0];
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;
  };

  const embedUrl = getEmbedUrl(movie.videoUrl);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Thumbnail with Gradient Overlay */}
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: movie.thumbnail }} style={styles.thumbnail} />
          <LinearGradient
            colors={["transparent", "#141414"]}
            style={styles.gradientOverlay}
          />
        </View>

        {/* Title and Metadata */}
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metadata}>
            <Text style={styles.metadataText}>
              1h 32m • R • Action, Thriller
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{movie.description}</Text>

          {/* Play Trailer Section */}
          {movie.videoUrl ? (
            isPlaying ? (
              <View style={styles.videoContainer}>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#E50914" />
                  </View>
                )}
                <WebView
                  style={styles.video}
                  source={{ uri: embedUrl || "" }}
                  allowsFullscreenVideo
                  javaScriptEnabled
                  domStorageEnabled
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  onLoad={() => setIsLoading(false)} // Hide loading when video loads
                  onError={(error) => {
                    console.error("WebView error:", error);
                    setIsLoading(false);
                  }}
                />
              </View>
            ) : (
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
            )
          ) : (
            <Text style={styles.noTrailerText}>
              No trailer available for this movie.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

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
    backgroundColor: "#000", // Match dark theme to avoid white flash
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000", // Ensure WebView background is dark
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
