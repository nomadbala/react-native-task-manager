import React from "react";
import { StyleSheet, FlatList, Pressable, Text, View } from "react-native";
import { useTasks } from "../provider/TaskProvider";
import Task from "../types/Task";

const Home = ({ navigation }: any) => {
  const { tasks, removeTask, markTaskCompleted } = useTasks();

  const incompleteTasks = tasks.filter((task) => !task.status);
  const completedTasks = tasks.filter((task) => task.status);

  const toggleTaskStatus = (id: string | number[]) => {
    markTaskCompleted(id);
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.block}>
      <View style={styles.taskInfo}>
        <Text>{item.title}</Text>
        {item.description && <Text>{item.description}</Text>}
        <Text>Status: {item.status ? "Completed" : "Pending"}</Text>
      </View>
      <View>
        <Pressable onPress={() => removeTask(item.id)}>
          <Text>Remove task</Text>
        </Pressable>
        {!item.status && (
          <Pressable onPress={() => toggleTaskStatus(item.id)}>
            <Text>Mark completed</Text>
          </Pressable>
        )}
        <View></View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Не выполненные задачи</Text>
        <FlatList
          data={incompleteTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTaskItem}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Выполненные задачи</Text>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTaskItem}
        />
      </View>
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("Add task")}
      >
        <Text>New task</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  block: {
    flexDirection: "row",
    borderWidth: 1,
    marginVertical: 12,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 12,
  },
  taskInfo: {
    flex: 1,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
});

export default Home;
