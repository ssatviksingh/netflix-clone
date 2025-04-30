import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { fetchMovieSections } from "../../api/movieService";
import { StackParamList } from "./HomeStack";

// Define Movie type
type Movie = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  videoUrl: string | null;
  fullMovieUrl: string | null; // Added full movie URL
};

// Define SectionData type
type SectionData = {
  title: string;
  movies: Movie[];
  isFeatured?: boolean; // Optional flag for featured sections
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [sections, setSections] = useState<SectionData[]>([]); // Movie sections state
  const [loading, setLoading] = useState(true); // Loading state

  // Function to load sections from API
  const loadSections = useCallback(async () => {
    setLoading(true);
    try {
      const sectionsData = await fetchMovieSections();
      // Parse and set sections, mark "Trending Now" as featured
      const parsed = sectionsData.map((section: any) => ({
        title: section.title,
        movies: section.movies,
        isFeatured: section.title === "Trending Now",
      }));
      setSections(parsed);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setSections([]); // Clear sections on error
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  }, []);

  // Load sections on component mount
  useEffect(() => {
    loadSections();
  }, [loadSections]);

  // Handle movie press: navigate to MovieDetail screen
  const handlePressMovie = (movie: Movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  // Render each movie item
  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => handlePressMovie(item)}
    >
      <Image
        source={{
          uri: item.thumbnail || "https://via.placeholder.com/140x200", // Fallback thumbnail
        }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  // Render loading screen
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading Movies...</Text>
      </SafeAreaView>
    );
  }

  // Render error screen if no sections loaded
  if (!sections.length) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Oops! Couldn't load movies. Please try again.
        </Text>
      </SafeAreaView>
    );
  }

  // Render main content
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30, backgroundColor: "#000" }}
      >
        {sections.map((section) => (
          <View key={section.title} style={styles.sectionContainer}>
            {/* Section title, highlighted if featured */}
            <Text
              style={[
                styles.sectionTitle,
                section.isFeatured && { color: "#E50914" }, // Red color for featured
              ]}
            >
              {section.title}
            </Text>

            {/* Horizontal FlatList of movies */}
            <FlatList
              data={section.movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMovie}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  sectionContainer: {
    marginVertical: 20,
    paddingLeft: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    color: "#fff",
    paddingLeft: 5,
  },
  movieList: {
    paddingRight: 15,
  },
  movieItem: {
    width: 140,
    marginRight: 10,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#222", // Placeholder background
  },
  movieTitle: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
