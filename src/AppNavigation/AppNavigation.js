import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import VerifyOTPScreen from '../screens/Auth/VerifyOTPScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import BottomSection from '../components/BottomSection/BottomSection';
import Profile from '../screens/Profile';
import RemindersListScreen from '../screens/Reminder/RemindersListScreen';
import InquiryListScreen from '../screens/Inquiry/InquiryListScreen';
import DrawerHeader from '../components/DrawerHeader';
import CustomDrawer from '../components/CustomDrawer';
import GetAQuote from '../screens/quotes';
import Inquiry from '../screens/Inquiry';
import Reminder from '../screens/Reminder';
import Claim from '../screens/Claim/index.js';
import HealthCard from '../screens/HealthCard';
import ClaimListScreen from '../screens/Claim/ClaimList';
import NotificationListScreen from '../screens/Notification';
import Loading from '../screens/Loading';
import Intro from '../screens/intro';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomSection {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="ReminderList" component={RemindersListScreen} />
      <Tab.Screen name="Reminder" options={{
        tabBarHideOnKeyboard: true,
      }} component={Reminder} />
      <Tab.Screen name="InquiryList" component={InquiryListScreen} />
      <Tab.Screen name="Inquiry" component={Inquiry} />
      <Tab.Screen name="Claim" component={Claim} />
      <Tab.Screen name="ClaimList" component={ClaimListScreen} />
      <Tab.Screen name="NotificationList" component={NotificationListScreen} />
      <Tab.Screen name="GetAQotes" component={GetAQuote} />
      <Tab.Screen name="HealthCard" component={HealthCard} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
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
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={VerifyOTPScreen} />
      <Stack.Screen name="Loader" component={Loading} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  );
};
