import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

// SplashScreen component that handles initial app animation and navigation
const SplashScreen = ({ navigation }: { navigation: any }) => {
  // Initialize an animated value for fade-in effect
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Start fade-in animation when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 1500, // Animation duration: 1.5 seconds
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      // After animation completes, wait 0.5s and navigate to main app
      setTimeout(() => {
        navigation.replace("(tabs)"); // Replace current screen with Tabs layout
      }, 500);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Text with fading opacity */}
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        Netflix Clone
      </Animated.Text>
    </View>
  );
};

// Styling for the splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // Dark background
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#E50914", // Netflix red color
  },
});

export default SplashScreen; // Export the component as default
