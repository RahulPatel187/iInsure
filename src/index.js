import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import VerifyOTPScreen from './screens/Auth/VerifyOTPScreen';
import HomeScreen from './screens/Home/HomeScreen';
import Profile from './screens/Profile';
import RemindersListScreen from './screens/Reminder/RemindersListScreen';
import InquiryListScreen from './screens/Inquiry/InquiryListScreen';
import AppNavigation from './AppNavigation/AppNavigation';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Splash"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={VerifyOTPScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Reminder" component={RemindersListScreen} />
            <Stack.Screen name="Inquiry" component={InquiryListScreen} />
        </Stack.Navigator> */}
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
