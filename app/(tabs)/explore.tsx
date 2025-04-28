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

const { width } = Dimensions.get("window");

const MovieItem = ({
  item,
}: {
  item: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    videoUrl: string | null;
  };
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.movieThumbnail} />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate("MovieDetail", { movie: item })}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [movies, setMovies] = useState<
    {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      videoUrl: string | null;
    }[]
  >([]);
  const [filteredMovies, setFilteredMovies] = useState<
    {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      videoUrl: string | null;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const popularMovies = await getPopularMovies();
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

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load movies. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Browse Popular Movies</Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  noResultsText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ExploreScreen;
