import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
LogBox.ignoreLogs(["Text strings must be rendered within a <Text> component"]);

/* GestureHandlerRootView: React Native WebView 혹은 react-native-gesture-handler를 사용하는 컴포넌트 (WebView, ScrollView, Button, Modal 등 포함)가 GestureHandlerRootView로 감싸야함  */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf") });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="screens/testpage1" options={{ presentation: "card" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
