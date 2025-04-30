import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native"; // For manually controlling the drawer
import { Ionicons } from "@expo/vector-icons"; // (Not used here but imported for future icons)
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import HomeStack from "./HomeStack";
import BrowseStack from "./BrowseStack";
import ProfileScreen from "./Profile";

// Create Drawer Navigator instance
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {" "}
      {/* Main container for navigation */}
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#1f1f1f",
            width: 240,
          },
          drawerActiveTintColor: "#E50914", // Color when item is active
          drawerInactiveTintColor: "#fff", // Color when item is inactive
          headerShown: false, // Hide default header
        }}
        drawerContent={(props) => {
          // Custom Drawer Content
          const navigateToSection = (screen: string) => {
            props.navigation.navigate(screen); // Navigate to a specific screen
          };

          const scrollToGenre = (genre: string) => {
            // Navigate and scroll inside HomeFeed screen to a genre
            props.navigation.navigate("HomeStack", {
              screen: "HomeFeed",
              params: { scrollTo: genre },
            });
            props.navigation.dispatch(DrawerActions.closeDrawer()); // Close drawer after selecting
          };

          return (
            <View style={styles.drawerContainer}>
              {/* Custom drawer items */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigateToSection("HomeStack")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigateToSection("BrowseStack")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Browse
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigateToSection("Profile")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Profile
                </Text>
              </TouchableOpacity>

              {/* Genre shortcuts */}
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Trending Now")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Trending
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Action")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Action
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Comedy")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Comedy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Drama")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Drama
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Sci-Fi")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Sci-Fi
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => scrollToGenre("Horror")}
              >
                <Text
                  style={[
                    styles.drawerText,
                    props.navigation.isFocused() ? styles.activeText : null,
                  ]}
                >
                  Horror
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      >
        {/* Define screens for the Drawer */}
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="BrowseStack" component={BrowseStack} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Styles for the drawer items and container
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
  } as const,
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  } as const,
  drawerText: {
    color: "#fff",
    fontSize: 18,
  } as const,
  activeText: {
    color: "#E50914",
  } as const,
});

export default App;
