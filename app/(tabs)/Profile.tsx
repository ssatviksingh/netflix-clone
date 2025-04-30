import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Background image (blurred for Netflix-like aesthetic)
const backgroundImage = "https://picsum.photos/seed/netflix/400/800?blur=5";
// Placeholder profile image
const profileImage = "https://via.placeholder.com/100";

const ProfileScreen = () => {
  const fadeAnim = new Animated.Value(0); // Animation value for fade-in
  const navigation = useNavigation(); // Hook to navigate between screens

  // Fade-in effect when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // Duration of fade animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  // Handler for editing profile (placeholder action)
  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    // You can navigate to EditProfile screen here
  };

  // Handler for logging out (placeholder action)
  const handleLogOut = () => {
    console.log("Logged out");
    // Add logout functionality here
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
    >
      {/* Overlay for dark effect over the background */}
      <View style={styles.overlay}>
        {/* Content with fade-in animation */}
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {/* Title */}
          <Text style={styles.sectionTitle}>User Profile</Text>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            {/* Profile Picture */}
            <Image source={{ uri: profileImage }} style={styles.profileImage} />

            {/* Username */}
            <Text style={styles.profileLabel}>Username:</Text>
            <Text style={styles.profileValue}>Guest</Text>

            {/* Email */}
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>guest@example.com</Text>

            {/* Edit Profile Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Log Out Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogOut}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

// Styles for the ProfileScreen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for contrast
    padding: 20,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  profileCard: {
    backgroundColor: "rgba(20, 20, 20, 0.95)", // Card background with slight transparency
    padding: 30,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    elevation: 15, // For Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular image
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#E50914", // Netflix red border
  },
  profileLabel: {
    color: "#ccc",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "500",
    width: "100%",
    textAlign: "left",
  },
  profileValue: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
    width: "100%",
    textAlign: "left",
    backgroundColor: "rgba(229, 9, 20, 0.1)", // Light red background for value
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#E50914", // Netflix red button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 15,
    width: "85%",
    alignItems: "center",
    elevation: 8,
  },
  logoutButton: {
    backgroundColor: "#555", // Grey button for logout
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: "85%",
    alignItems: "center",
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProfileScreen;
