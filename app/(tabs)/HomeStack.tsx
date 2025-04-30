import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import HomeScreen from "./Home";
import MovieDetailScreen from "./MovieDetail";

// Define the param list for the stack navigation
export type StackParamList = {
  HomeFeed: { scrollTo?: string } | undefined; // HomeFeed can optionally receive a scrollTo param
  MovieDetail: {
    movie: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
    };
  };
};

// Create the stack navigator instance
const Stack = createStackNavigator<StackParamList>();

// Custom header component with a menu button to open the drawer
const CustomHeader = () => {
  const navigation = useNavigation(); // Access navigation object

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // Open drawer when menu icon is pressed
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuIcon}>
        <Text style={styles.menuText}>☰</Text> {/* Menu icon (hamburger) */}
      </TouchableOpacity>
      <Text style={styles.logo}>Netflix Clone</Text> {/* App logo/title */}
    </View>
  );
};

// Home stack containing two screens: HomeFeed and MovieDetail
const HomeStack = () => (
  <Stack.Navigator>
    {/* Home screen with custom header */}
    <Stack.Screen
      name="HomeFeed"
      component={HomeScreen}
      options={{
        headerShown: true,
        header: () => <CustomHeader />, // Use custom header
      }}
    />
    {/* Movie Detail screen with default dark themed header */}
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={{
        title: "Movie Details",
        headerStyle: {
          backgroundColor: "#141414", // Dark background for header
        },
        headerTintColor: "#fff", // White color for back arrow and title
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff", // Title text in white
        },
      }}
    />
  </Stack.Navigator>
);

// Styles for header and buttons
const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414", // Same dark theme background
  },
  menuIcon: {
    padding: 10, // Touch area for the menu icon
  },
  menuText: {
    fontSize: 30,
    color: "#fff", // White colored menu icon
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E50914", // Netflix red color for the logo
    textAlign: "center",
    flex: 1, // Center the logo horizontally
  },
});

export default HomeStack;
