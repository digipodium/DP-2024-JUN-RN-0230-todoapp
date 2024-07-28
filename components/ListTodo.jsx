import React, { useState } from 'react'
import { FlatList, Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { AnimatedFAB, Button, Card, Checkbox, Divider, IconButton, Menu, Provider, Text, TextInput } from 'react-native-paper'
import CreateTodo from './CreateTodo'

const TaskCard = ({ index, deleteTodo, taskList, setTaskList, text, completed, createdAt }) => {

    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(text);

    const updateTask = () => {
        const temp = taskList;
        temp[index].text = userInput;
        setTaskList([...temp]);
        Keyboard.dismiss();
        setEditMode(false);
    }

    const toggleTask = () => {
        const temp = taskList;
        temp[index].completed = !temp[index].completed;
        setTaskList([...temp]);
    }

    console.log(index);
    return <Card style={{ ...styles.taskCard, backgroundColor: completed ? 'lightgreen' : 'white' }}>
        <Card.Content>
            <Text>{createdAt.toDateString()} {createdAt.toLocaleTimeString()}</Text>
            <Checkbox status={completed ? 'checked' : 'unchecked'} onPress={toggleTask} />
            {
                editMode ? (
                    <TextInput onChangeText={setUserInput} value={userInput} />
                ) : (
                    <Text>{text}</Text>
                )
            }
        </Card.Content>
        <Card.Actions>

            <Button icon="pencil" onPress={() => { editMode ? updateTask() : setEditMode(true) }}>
                {editMode ? 'Update' : 'Edit'}
            </Button>

            <Button icon="delete" onPress={() => deleteTodo(index)}>Delete</Button>

        </Card.Actions>
    </Card>
}

const ListTodo = () => {

    const [taskList, setTaskList] = useState([]);

    const [showTodoForm, setShowTodoForm] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

    const handleMenuPress = (event) => {
        const { nativeEvent } = event;
        console.log(nativeEvent);
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY-20,
        };

        setMenuAnchor(anchor);
        setMenuVisible(true);
    }

    const deleteTodo = (index) => {
        setTaskList([...taskList.filter((task, i) => i !== index)]);
    }

    return (
        <View style={styles.container}>
            <CreateTodo
                visible={showTodoForm}
                setVisible={setShowTodoForm}
                taskList={taskList}
                setTaskList={setTaskList}
            />
            <View style={styles.header}>
                <IconButton iconColor='white' style={styles.menuIcon} icon='dots-vertical' onPress={handleMenuPress} >
                </IconButton>
                
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    // anchorPosition='bottom'
                    // anchor={<IconButton iconColor='white' style={styles.menuIcon} icon='dots-vertical' onPress={() => setMenuVisible(true)} />}>
                    anchor={menuAnchor}>
                    <Menu.Item leadingIcon='sort' onPress={() => { }} title="Sort A-Z" />
                    <Menu.Item leadingIcon='sort-bool-ascending-variant' onPress={() => { }} title="Sort by Completed" />
                    <Divider />
                    <Menu.Item leadingIcon='sort-calendar-ascending' onPress={() => { }} title="Sort By Date" />
                </Menu>
                <Text style={styles.title}>List Todo</Text>
            </View>
            <View style={styles.content}>
                {/* {displayList()} */}

                <FlatList
                    data={taskList}
                    renderItem={({ item, index }) => <TaskCard deleteTodo={deleteTodo} taskList={taskList} setTaskList={setTaskList} {...item} index={index} />}
                    keyExtractor={(item, index) => { return index }}
                    ListEmptyComponent={() => <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#999', textAlign: 'center' }}>No Task Added Yet</Text>}
                />
            </View>

            <AnimatedFAB
                onPress={() => setShowTodoForm(true)}
                icon='plus'
                label='Add Task'
                style={styles.addBtn}
                extended={true}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flex: 1,
        backgroundColor: 'crimson',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    content: {
        flex: 5,
    },
    menuIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    scrollContent: {
        padding: 20,
    },
    taskCard: {
        marginBottom: 10,
    },
    addBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
})

export default ListTodo;