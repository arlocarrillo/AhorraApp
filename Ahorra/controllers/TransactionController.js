import TransactionModel from '../models/Transaction';
import UsuarioController from './UsuarioController';

class TransactionController {
    async getFilteredTransactions(type) {
        const user = UsuarioController.getCurrentUser();
        if (!user) return { success: false, transactions: [], error: 'Usuario no autenticado.' };
        const isIncome = type === 'Ingresos';
        const result = await TransactionModel.getAll(user.id);

        if (result.success) {
            const filtered = result.transactions.filter(t => 
                isIncome ? t.isIncome === 1 : t.isIncome === 0
            );
            return { success: true, transactions: filtered };
        } else {
            return { success: false, transactions: [], error: 'Error al cargar transacciones.' };
        }
    }

    async addTransaction(concept, amount, isIncome) {
        const user = UsuarioController.getCurrentUser();
        if (!user) return { success: false, error: 'Usuario no autenticado.' };
        if (!concept || amount <= 0) {
            return { success: false, error: 'Concepto y monto son requeridos.' };
        }
        const result = await TransactionModel.create(concept, amount, isIncome, user.id);
        if (result.success) {
            return { success: true, transaction: result };
        } else {
            return { success: false, error: 'Error al guardar la transacción.' };
        }
    }

    async deleteTransaction(id) {
        const user = UsuarioController.getCurrentUser();
        if (!user) return { success: false, error: 'Usuario no autenticado.' };
        const result = await TransactionModel.delete(id, user.id);
        if (result.success) {
            return { success: true, message: 'Transacción eliminada con éxito.' };
        } else {
            return { success: false, error: 'Error al eliminar la transacción.' };
        }
    }

    async getFinancialSummary(){
        const user=UsuarioController.getCurrentUser();
        if (!user){
            return {success:false, summary:null, error:"Usuario no identificado"};
        }
        const result = await TransactionModel.getAll(user.id);
        if (result.success){
            let totalIncome = 0;
            let totalExpense= 0;
            const monthlyData = {};
            result.transactions.forEach(t => {
                const amount = t.amount;
                if (t.isIncome === 1){
                    totalIncome += amount;
                }else{
                    totalExpense+=amount;
                }
            });

            const balance= totalIncome-totalExpense;
            return{
                success:true,
                summary:{
                    totalIncome,
                    totalExpense,
                    balance,
                }
            };
        }else{
            return {success:false,summary:null,error:'Error al cargar resumen financiero'}
        }
    }

    async getLastTransactions(limit = 10) {
        const user = UsuarioController.getCurrentUser();
        if (!user) return { success: false, transactions: [], error: 'Usuario no autenticado.' };
        const result = await TransactionModel.getAll(user.id, limit); 
        if (result.success) {
            return { success: true, transactions: result.transactions };
        } else {
            return { success: false, transactions: [], error: 'Error al cargar los últimos movimientos.' };
        }
    }
}

export default new TransactionController();