import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

async function openDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    const asset = await Asset.fromModule(require('../assets/myDatabaseName.db')).downloadAsync();
    await FileSystem.copyAsync({
        from: asset.localUri,
        to: FileSystem.documentDirectory + 'SQLite/myDatabaseName.db',
    });
    return SQLite.openDatabase('myDatabaseName.db');
}

export { openDatabase };