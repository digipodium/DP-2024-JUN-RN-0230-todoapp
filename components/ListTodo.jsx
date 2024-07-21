import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { AnimatedFAB, Button, Card, Text } from 'react-native-paper'
import CreateTodo from './CreateTodo'

const TaskCard = ({ index, deleteTodo, text, completed, createdAt }) => {
    console.log(index);
    return <Card style={styles.taskCard}>
        <Card.Content>
            <Text>{createdAt.toDateString()} {createdAt.toLocaleTimeString()}</Text>
            <Text>{text}</Text>
        </Card.Content>
        <Card.Actions>
            <Button icon="pencil">Edit</Button>
            <Button icon="delete" onPress={() => deleteTodo(index)}>Delete</Button>
        </Card.Actions>
    </Card>
}

const ListTodo = () => {

    const [taskList, setTaskList] = useState([]);

    const [showTodoForm, setShowTodoForm] = useState(false);

    const displayList = () => {
        return <ScrollView style={styles.scrollContent}>
            {
                taskList.map((task, index) => {
                    return <Card key={index} style={styles.taskCard}>
                        <Card.Content>
                            <Text>{task.text}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button icon="pencil">Edit</Button>
                            <Button icon="delete">Delete</Button>
                        </Card.Actions>
                    </Card>
                })
            }
        </ScrollView>
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
                <Text>List Todo</Text>
            </View>
            <View style={styles.content}>
                {/* {displayList()} */}

                <FlatList
                    data={taskList}
                    renderItem={({ item, index }) => <TaskCard deleteTodo={deleteTodo} {...item} index={index} />}
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
        backgroundColor: 'blue',
    },
    content: {
        flex: 5,
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