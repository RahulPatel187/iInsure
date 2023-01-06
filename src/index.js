import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './AppNavigation/AppNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PushNotification, { Importance } from "react-native-push-notification";
import { fcmService } from "./notifications/FCMService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localNotificationService } from "./notifications/LocalNotificationService";
import { useSelector } from 'react-redux';
import SplashScreen from './screens/SplashScreen';
const Stack = createNativeStackNavigator();

function App() {
  const userToken = useSelector((state) => state.login.userToken);
  PushNotification.createChannel(
    {
      channelId: `iEnsure`, // (required)
      channelName: `iEnsure`, // (required)
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  React.useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log(`[App] onRegister:`, token);
      // Helpers.saveInPref(Constant.FCM_TOKEN, token);
      AsyncStorage.setItem("dummyToken", token);
    }

    function onNotification(notify) {
      console.log(`[App] onNotification:`, notify);
      const option = {
        soundName: "default",
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        option
      );
    }

    function onOpenNotification(notify) {
      console.log(`[App] onOpenNotification:`, notify);
      // alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log(`[App] unRegister`);
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  }, []);

  if(!userToken){
    <SplashScreen />
  }
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
