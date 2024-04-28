import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

async function loadDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    const asset = await Asset.fromModule(require('../assets/barbedWire.db')).downloadAsync();
    await FileSystem.copyAsync({
        from: asset.localUri,
        to: FileSystem.documentDirectory + 'SQLite/barbedWire.db',
    });
}

export { loadDatabase };