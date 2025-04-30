import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Platform, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import BrowseStack from "./BrowseStack";
import ProfileScreen from "./Profile";
import SplashScreen from "./_splash";

// Define the parameter list for the Tab Navigator
type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Profile: undefined;
};

// Create the Bottom Tab Navigator instance
const Tab = createBottomTabNavigator<TabParamList>();

const Layout = () => {
  // State to control whether the splash screen is visible
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the splash screen after 2 seconds
    const timer = setTimeout(() => setIsSplashVisible(false), 2000);
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  // If the splash screen is still visible, render it
  if (isSplashVisible) {
    return (
      <SplashScreen
        navigation={{ replace: (route: string) => setIsSplashVisible(false) }}
      />
    );
  }

  // Define screen options for each tab (icon, colors, style)
  const screenOptions = ({
    route,
  }: {
    route: RouteProp<TabParamList, keyof TabParamList>;
  }): BottomTabNavigationOptions => {
    // Map tab names to Ionicons icon names
    const iconMap: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> =
      {
        Home: "home",
        Browse: "search",
        Profile: "person",
      };

    return {
      // Set the tab bar icon for each screen
      tabBarIcon: ({ color, size }) => (
        <Ionicons
          name={iconMap[route.name as keyof TabParamList]}
          size={size}
          color={color}
        />
      ),
      tabBarActiveTintColor: "#E50914", // Active tab color
      tabBarInactiveTintColor: "gray", // Inactive tab color
      tabBarStyle: { backgroundColor: "#141414" }, // Tab bar background color
      headerShown: false, // Hide the default header
      transitionSpec: {
        animation: "timing", // Timing animation for screen transitions
        config: {
          duration: 300, // Animation duration (in milliseconds)
        },
      },
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Set up the Bottom Tab Navigator */}
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Browse" component={BrowseStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// Define the global styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // Match the dark theme
    paddingTop: Platform.OS === "android" ? 25 : 0, // Add padding for Android status bar
  },
});

export default Layout;
