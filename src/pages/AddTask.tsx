import { useState } from "react";
import { useTasks } from "../provider/TaskProvider";
import AlertError from "../exception_handler/ErrorAlert";
import { Pressable, Text, TextInput, View } from "react-native";

const AddTask = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (!title || !description) {
      AlertError("Title or description invalid!");
      return;
    }

    addTask(title, description);
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Pressable onPress={handleAddTask}>
        <Text>Add task</Text>
      </Pressable>
    </View>
  );
};

export default AddTask;
