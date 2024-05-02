import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const loadDatabase = async () => {
    const dbName = 'barbedWire.db';
    const dbAsset = require('../assets/barbedWire.db');
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(
            `${FileSystem.documentDirectory}SQLite`,
            {intermediates: true}
        );
        await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
};

const deleteDatabase = async () => {
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`)
}

export { loadDatabase, deleteDatabase };