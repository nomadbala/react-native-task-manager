import { Alert, Platform } from "react-native";

const AlertError = (message: string) => {
  if (Platform.OS === "web") {
    alert(message);
  } else {
    Alert.alert(message);
  }
};

export default AlertError;
