import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../types/Task";

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await AsyncStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading data", error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving data", error);
  }
};
