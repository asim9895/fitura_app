import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme } from "react-native";
import { dark, light } from "@/theme/colors";
import { set_theme } from "@/redux/slices/theme_slice";
import { persistor, store } from "@/redux/store";
import { set_selected_date } from "@/redux/slices/user_slice";
import { todays_date } from "@/utils/variables";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { fonts } from "@/data/fonts";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Separate component for the main app content
function MainApp({ loaded }: { loaded: boolean }) {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      dispatch(set_selected_date({ selected_date: todays_date }));
      SplashScreen.hideAsync();
    }
  }, [loaded, dispatch]);

  useEffect(() => {
    if (loaded) {
      dispatch(
        set_theme({
          theme: colorScheme,
          colors: colorScheme === "dark" ? dark : light,
        })
      );
      SplashScreen.hideAsync();
    }
  }, [loaded, dispatch, colorScheme]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="activity-info/add-activity-log"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="calorie-info/add-calorie-log"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="calorie-info/add-calorie"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="calorie-info/edit-calorie"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="activity-info/add-activity"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="activity-info/edit-activity"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="food/edit-food"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="food/add-food"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="exercise/add-exercise"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="exercise/edit-exercise"
        options={{ headerShown: false, animation: "simple_push" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts(fonts);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp loaded={loaded} />
      </PersistGate>
    </Provider>
  );
}
