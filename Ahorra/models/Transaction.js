import { Platform } from 'react-native';
import DatabaseService from '../database/DatabaseService';

class TransactionModel {
    async getAll(userId) {
        const db = DatabaseService.getDatabase();
        if (Platform.OS !== 'web' && !db) {
            console.error('ERROR: Base de datos no disponible para consulta.');
            return { success: false, transactions: [] };
        }

        try {
            const results = await db.getAllAsync(
                'SELECT * FROM transactions WHERE userId = ? ORDER BY id DESC;',
                [userId]
            );
            return { success: true, transactions: results };
        } catch (error) {
            console.error('Error al obtener transacciones:', error);
            return { success: false, transactions: [] };
        }
    }

    async create(concept, amount, isIncome, userId) {
        const db = DatabaseService.getDatabase();
        if (Platform.OS !== 'web' && !db) {
            return { success: false, error: new Error('La base de datos no ha sido inicializada.') };
        }

        try {
            const result = await db.runAsync(
                'INSERT INTO transactions (concepto, monto, isIncome, userId) VALUES (?, ?, ?, ?);',
                [concept, amount, isIncome ? 1 : 0, userId]
            );
            
            return { 
                success: true, 
                id: result.lastInsertRowId,
                concept,
                amount,
                isIncome: isIncome ? 1 : 0,
                userId
            };
        } catch (error) {
            console.error('Error al insertar transacción:', error);
            return { success: false, error: error };
        }
    }

    async delete(id, userId) {
        const db = DatabaseService.getDatabase();
        if (Platform.OS !== 'web' && !db) {
            return { success: false, error: new Error('La base de datos no ha sido inicializada.') };
        }

        try {
            await db.runAsync(
                'DELETE FROM transactions WHERE id = ? AND userId = ?;',
                [id, userId]
            );
            return { success: true };
        } catch (error) {
            console.error('Error al eliminar transacción:', error);
            return { success: false, error: error };
        }
    }
}

export default new TransactionModel();