import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import VerifyOTPScreen from "../screens/Auth/VerifyOTPScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import BottomSection from "../components/BottomSection/BottomSection";
import Profile from "../screens/Profile";
import RemindersListScreen from "../screens/Reminder/RemindersListScreen";
import InquiryListScreen from "../screens/Inquiry/InquiryListScreen";
import DrawerHeader from "../components/DrawerHeader";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomSection {...props} />} screenOptions={{
      headerShown: false,
    }} >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Reminder" component={RemindersListScreen} />
      <Tab.Screen name="Inquiry" component={InquiryListScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
    }}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}


const Stack = createNativeStackNavigator();

export default AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={VerifyOTPScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  );
}