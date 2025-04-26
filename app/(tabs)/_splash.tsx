import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds fade-in
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('(tabs)'); // Navigate to the tab layout after splash
      }, 500); // Hold for 0.5 seconds after fade
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        Netflix Clone
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E50914',
  },
});

export default SplashScreen; // Ensure default export