import { StatusBar } from 'expo-status-bar';
import { StatusBar as NativeStatusBar, StyleSheet, Text, View } from 'react-native';
import ListTodo from './components/ListTodo';
import { Provider } from 'react-native-paper';

const statusBarHeight = NativeStatusBar.currentHeight;
// console.log(statusBarHeight);

export default function App() {
  return (
    <Provider>
      <View style={styles.container}>
        <ListTodo />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
});
