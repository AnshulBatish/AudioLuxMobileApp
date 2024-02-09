// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";

// import Home from "./index";
// import ConnectDevice from "./connectDevice";
// import CustomHeader from "../components/CustomHeader";
// import EditDevice from "../components/EditDevice";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     "Kumbh-Sans": require("../assets/fonts/Kumbh_Sans/KumbhSans-VariableFont_YOPQ,wght.ttf"),
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   } else {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen
//             name="EditDevice"
//             component={EditDevice}
//             options={{
//               // Set the presentation mode to modal for our modal route.
//               presentation: 'transparentModal',
//             }}
//           />
//           <Stack.Screen name="ConnectDevice" component={ConnectDevice} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
