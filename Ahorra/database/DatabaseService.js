import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Modo Web: Usando LocalStorage (Simulado).');
            return;
        }

        try {
            this.db = await SQLite.openDatabaseAsync('ahorra.db');
            await this.db.execAsync(`
                PRAGMA foreign_keys = ON;
                
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,    
                    password TEXT NOT NULL,
                    telefono TEXT UNIQUE NOT NULL,  
                    fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
            
            console.log('✅ Base de datos y tabla users inicializadas correctamente.');
        } catch (error) {
            console.error('Error fatal al inicializar la BD:', error);
        }
    }

    getDatabase() {
        if (Platform.OS !== 'web' && !this.db) {
            console.warn('Advertencia: Intentando acceder a la base de datos antes de ser inicializada.');
        }
        return this.db;
    }
}

export default new DatabaseService();