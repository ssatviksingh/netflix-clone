import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import HomeScreen from "./Home";
import MovieDetailScreen from "./MovieDetail";

// Define the param list for the stack
export type StackParamList = {
  HomeFeed: { scrollTo?: string } | undefined;
  MovieDetail: {
    movie: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
    };
  };
};

const Stack = createStackNavigator<StackParamList>();

const CustomHeader = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuIcon}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>Netflix Clone</Text>
    </View>
  );
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeFeed"
      component={HomeScreen}
      options={{
        headerShown: true,
        header: () => <CustomHeader />,
      }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={{
        title: "Movie Details",
        headerStyle: {
          backgroundColor: "#141414", // Match the dark theme
        },
        headerTintColor: "#fff", // White back arrow and title
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff", // White title text
        },
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 30,
    color: "#fff",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E50914",
    textAlign: "center",
    flex: 1,
  },
});

export default HomeStack;
