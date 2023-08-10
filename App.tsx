import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerActions,
  NavigationContainer,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";

export type StackParamList = {
  Home: undefined;
  Details: { itemID: number; otherParam?: string };
  Modal: undefined;
  Cool: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "left",
          drawerType: "front",
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>

      {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Details") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailsScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
    /*
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: 'Home custom title',
            headerTitleStyle: { color: 'red' },
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={({ navigation }) => ({
            presentation: 'modal',
            headerShown: true,
            headerLeft: () => (
              <View style={styles.closeButtonContainer}>
                <Text style={styles.closeButton} onPress={() => navigation.dispatch(StackActions.pop())}>X</Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Cool"
          component={Cool}
          options={{
            headerShown: true,
            headerTitle: 'Cool title',
            headerTitleStyle: { color: 'blue' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    */
  );
}

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBage: 1,
    });
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemID: 123,
            otherParam: "Blah blah blah",
          })
        }
      />
      <Button
        title="Go to Modal"
        onPress={() => navigation.navigate("Modal")}
      />
      <Button
        title="Go to Cool Screen"
        onPress={() => navigation.navigate("Cool")}
      />
    </View>
  );
}

type CoolScreenNavigationProp = StackNavigationProp<StackParamList, "Cool">;

export function Cool() {
  const navigation = useNavigation<CoolScreenNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is cool!</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

type DetailsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "Details"
>;
type DetailsScreenRouteProp = RouteProp<StackParamList, "Details">;

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, "Modal">;

export function DetailsScreen() {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

export function ModalScreen() {
  const navigation = useNavigation<ModalScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemID: 999,
            otherParam: "Blah blah blah",
          })
        }
      />
      <Button
        title="Go to Modal AGAIN?"
        onPress={() => navigation.push("Modal")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonContainer: {
    marginLeft: 10,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", // Customize the color as per your preference
  },
});
