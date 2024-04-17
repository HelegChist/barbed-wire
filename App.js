import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import List from './components/List';
import { BACKGROUND_COLOR } from './constants/Color';

export default function App() {
    return (<View style={styles.container}>
        <List>

        </List>
        <StatusBar style="auto"/>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
});
