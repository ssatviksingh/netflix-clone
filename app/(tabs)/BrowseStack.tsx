import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "./explore";
import MovieDetailScreen from "./MovieDetail";

// Define types for the navigation parameters
export type StackParamList = {
  BrowseMovies: undefined; // No parameters expected for BrowseMovies screen
  MovieDetail: {
    movie: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      videoUrl: string;
    };
  };
  VideoPlayer: {
    videoUrl: string;
  };
};

// Create a stack navigator typed with StackParamList
const Stack = createStackNavigator<StackParamList>();

// Define the BrowseStack component which holds the stack navigation for browsing movies
const BrowseStack = () => (
  <Stack.Navigator>
    {/* Screen to browse all movies */}
    <Stack.Screen
      name="BrowseMovies"
      component={ExploreScreen}
      options={{ headerShown: false }} // Hide header for the main browse screen
    />

    {/* Screen to show detailed information about a movie */}
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={{ title: "Movie Details" }} // Set a custom title for the Movie Detail screen
    />
  </Stack.Navigator>
);

export default BrowseStack;
