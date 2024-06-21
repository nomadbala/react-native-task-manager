import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();

import { TaskProvider } from "./src/provider/TaskProvider";
import Home from "./src/pages/Home";
import AddTask from "./src/pages/AddTask";

const App = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({})}
            />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen
              name="Add task"
              component={AddTask}
              options={({ navigation }) => ({})}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
