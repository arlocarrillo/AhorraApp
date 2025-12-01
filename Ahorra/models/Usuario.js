import { Platform } from 'react-native';
import DatabaseService from '../database/DatabaseService';

class UsuarioModel {
    async create(nombre, email, telefono, password) {
        const db = DatabaseService.getDatabase();
        
        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const newUser = { id: Date.now(), nombre, email, telefono, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            return { success: true, id: newUser.id };
        } else {
            try {
                const result = await db.runAsync(
                    'INSERT INTO users (nombre, email, telefono, password) VALUES (?, ?, ?, ?);',
                    [nombre, email, telefono, password]
                );
                return { 
                    success: true, 
                    id: result.lastInsertRowId,
                };
            } catch (error) {
                return { success: false, error: error };
            }
        }
    }

    async login(email, password) {
        const db = DatabaseService.getDatabase();

        if (Platform.OS === 'web') {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            return user 
                ? { success: true, user } 
                : { success: false, error: 'Credenciales inválidas' };
        } else {
            try {
                const user = await db.getFirstAsync(
                    'SELECT id, nombre, email, telefono FROM users WHERE email = ? AND password = ?;',
                    [email, password]
                );

                if (user) {
                    return { success: true, user };
                } else {
                    return { success: false, error: 'Correo o contraseña incorrectos.' };
                }
            } catch (error) {
                console.error('Error en el modelo de login:', error);
                return { success: false, error: 'Error al buscar usuario en la BD.' };
            }
        }
    }
}

export default new UsuarioModel();