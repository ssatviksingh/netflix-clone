import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "./BrowseStack";
import { getPopularMovies } from "../../api/movieService";

// Get device screen width for dynamic sizing
const { width } = Dimensions.get("window");

// Movie item component
const MovieItem = ({
  item,
}: {
  item: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    videoUrl: string | null;
    fullMovieUrl: string | null;
  };
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
    >
      {/* Movie thumbnail image */}
      <Image source={{ uri: item.thumbnail }} style={styles.movieThumbnail} />

      {/* Movie title */}
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>

      {/* Play button */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate("MovieDetail", { movie: item })}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ExploreScreen: Displays list of movies and search functionality
const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  // State for movie data, filtered data, loading and error handling
  const [movies, setMovies] = useState<
    {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      videoUrl: string | null;
      fullMovieUrl: string | null;
    }[]
  >([]);
  const [filteredMovies, setFilteredMovies] = useState<typeof movies>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch popular movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        const popularMovies = await getPopularMovies();

        // Handle empty results
        if (!popularMovies || popularMovies.length === 0) {
          setError(true);
          setMovies([]);
          setFilteredMovies([]);
        } else {
          setMovies(popularMovies);
          setFilteredMovies(popularMovies);
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError(true);
        setMovies([]);
        setFilteredMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Update filtered movies when search query changes
  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Show error message if fetching fails
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load movies. Please try again later.
        </Text>
      </View>
    );
  }

  // Main screen UI
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.sectionTitle}>Browse Popular Movies</Text>

      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Movies list */}
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.browseList}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          searchQuery.length > 0 ? (
            <Text style={styles.noResultsText}>No movies found.</Text>
          ) : null
        }
      />
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  browseList: {
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  movieItem: {
    marginBottom: 10,
    width: width * 0.45,
    alignItems: "center",
  },
  movieThumbnail: {
    width: "100%",
    height: width * 0.6,
    borderRadius: 10,
    resizeMode: "cover",
  },
  movieTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
    width: "100%",
  },
  playButton: {
    backgroundColor: "#E50914",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
});

export default ExploreScreen;
