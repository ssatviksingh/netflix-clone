import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native'; // Corrected import
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import BrowseStack from './BrowseStack';
import ProfileScreen from './Profile';
import SplashScreen from './_splash';

// Define the param list for the tab navigator
type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const Layout = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 2000); // 2 seconds total
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen navigation={{ replace: (route: string) => setIsSplashVisible(false) }} />;
  }

  const screenOptions = ({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }): BottomTabNavigationOptions => {
    const iconMap: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
      Home: 'home',
      Browse: 'search',
      Profile: 'person',
    };

    return {
      tabBarIcon: ({ color, size }) => <Ionicons name={iconMap[route.name as keyof TabParamList]} size={size} color={color} />,
      tabBarActiveTintColor: '#E50914',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#141414' },
      headerShown: false,
      transitionSpec: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Browse" component={BrowseStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default Layout;