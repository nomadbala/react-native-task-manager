import { createContext } from "react";
import Task from "./Task";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  removeTask: (id: string | number[]) => void;
  markTaskCompleted: (id: string | number[]) => void;
};

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;
