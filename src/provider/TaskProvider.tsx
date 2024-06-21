import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import Task from "../types/Task";
import TaskContext from "../types/TaskContext";

const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await AsyncStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading data", error);
    return [];
  }
};

const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string, description: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: uuid.v4(),
        title,
        description,
        status: false,
      },
    ]);
  }, []);

  const removeTask = useCallback((id: string | number[]) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const markTaskCompleted = useCallback((id: string | number[]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: true } : task
      )
    );
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, markTaskCompleted }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error();
  }

  return context;
}
