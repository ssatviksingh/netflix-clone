import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './explore';
import MovieDetailScreen from './MovieDetail';


export type StackParamList = {
  BrowseMovies: undefined;
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

const Stack = createStackNavigator<StackParamList>();

const BrowseStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BrowseMovies" component={ExploreScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
  </Stack.Navigator>
);

export default BrowseStack;