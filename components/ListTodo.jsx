import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { AnimatedFAB, Button, Card, Text } from 'react-native-paper'

const TaskCard = ({ text, completed, createdAt }) => {
    return <Card style={styles.taskCard}>
        <Card.Content>
            <Text>{text}</Text>
        </Card.Content>
        <Card.Actions>
            <Button icon="pencil">Edit</Button>
            <Button icon="delete">Delete</Button>
        </Card.Actions>
    </Card>
}

const ListTodo = () => {

    const [taskList, setTaskList] = useState([
        { text: 'Learn React', completed: false, createdAt: new Date() },
        { text: 'Learn Angular', completed: false, createdAt: new Date() },
        { text: 'Learn Vue', completed: false, createdAt: new Date() },
        { text: 'Learn NextJS', completed: false, createdAt: new Date() },
        { text: 'Learn React', completed: false, createdAt: new Date() },
        { text: 'Learn Angular', completed: false, createdAt: new Date() },
        { text: 'Learn Vue', completed: false, createdAt: new Date() },
        { text: 'Learn NextJS', completed: false, createdAt: new Date() },
        { text: 'Learn React', completed: false, createdAt: new Date() },
        { text: 'Learn Angular', completed: false, createdAt: new Date() },
        { text: 'Learn Vue', completed: false, createdAt: new Date() },
        { text: 'Learn NextJS', completed: false, createdAt: new Date() },
        { text: 'Learn React', completed: false, createdAt: new Date() },
        { text: 'Learn Angular', completed: false, createdAt: new Date() },
        { text: 'Learn Vue', completed: false, createdAt: new Date() },
        { text: 'Learn NextJS', completed: false, createdAt: new Date() },
        { text: 'Learn React', completed: false, createdAt: new Date() },
        { text: 'Learn Angular', completed: false, createdAt: new Date() },
        { text: 'Learn Vue', completed: false, createdAt: new Date() },
        { text: 'Learn NextJS', completed: false, createdAt: new Date() }
    ]);

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

    return (
        <View style={styles.container}>



            <View style={styles.header}>
                <Text>List Todo</Text>
            </View>
            <View style={styles.content}>
                {/* {displayList()} */}

                <FlatList
                    data={taskList}
                    renderItem={({ item }) => <TaskCard {...item} />}
                    keyExtractor={(item, index) => { return index }}
                />
            </View>

            <AnimatedFAB
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