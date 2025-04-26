import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Background image (you can replace with a local asset or a different URL)
const backgroundImage = 'https://picsum.photos/seed/netflix/400/800?blur=5';

const ProfileScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleEditProfile = () => {
    // Add navigation or logic for editing profile (e.g., navigate to an EditProfile screen)
    console.log('Edit Profile clicked');
  };

  const handleLogOut = () => {
    // Add logout logic here
    console.log('Logged out');
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
      <View style={styles.overlay}>
        <Animated.Text style={[styles.sectionTitle, { opacity: fadeAnim }]}>
          User Profile
        </Animated.Text>
        <View style={styles.profileCard}>
          <Animated.Text style={[styles.profileText, { opacity: fadeAnim, fontSize: 18 }]}>
            Username: <Text style={styles.highlight}>Guest</Text>
          </Animated.Text>
          <Animated.Text style={[styles.profileText, { opacity: fadeAnim, fontSize: 18 }]}>
            Email: <Text style={styles.highlight}>guest@example.com</Text>
          </Animated.Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay for readability
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileText: {
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  highlight: {
    color: '#E50914',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;