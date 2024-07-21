import React, { useRef, useState } from 'react'
import { Keyboard, Modal, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

const CreateTodo = ({ visible, setVisible, taskList, setTaskList }) => {

    const inputRef = useRef();

    const [taskText, setTaskText] = useState('');

    const addNewTask = () => {
        console.log(taskText);
        const newTask = { text: taskText, completed: false, createdAt: new Date() };
        setTaskList([newTask, ...taskList]);
        Keyboard.dismiss();
        setVisible(false);
    }

    return (
        <Modal visible={visible} onRequestClose={() => setVisible(false)} animationType='slide' >
            <View style={styles.container}>
                <Text variant='headlineMedium' style={styles.title}>Create Todo</Text>
                <TextInput
                    onChangeText={setTaskText}
                    ref={inputRef}
                    label='Task to be added'
                    multiline
                    numberOfLines={6} />
                <View style={styles.btnContainer}>
                    <Button
                        mode='outlined'
                        onPress={() => setVisible(false)}
                        style={styles.button}
                    >Cancel</Button>
                    <Button
                        mode='contained'
                        onPress={addNewTask}
                        style={styles.button}
                    >Add Task</Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    button: {
        marginTop: 20
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 10
    }
})

export default CreateTodo