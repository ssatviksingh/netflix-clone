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

// Background image (blurred for Netflix-like effect)
const backgroundImage = "https://picsum.photos/seed/netflix/400/800?blur=5";
// Placeholder profile image
const profileImage = "https://via.placeholder.com/100";

const ProfileScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // Smoother fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleLogOut = () => {
    console.log("Logged out");
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>User Profile</Text>
          <View style={styles.profileCard}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <Text style={styles.profileLabel}>Username:</Text>
            <Text style={styles.profileValue}>Guest</Text>
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>guest@example.com</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker for better contrast
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
    backgroundColor: "rgba(20, 20, 20, 0.95)",
    padding: 30,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#E50914",
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
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#E50914",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 15,
    width: "85%",
    alignItems: "center",
    elevation: 8,
  },
  logoutButton: {
    backgroundColor: "#555",
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
