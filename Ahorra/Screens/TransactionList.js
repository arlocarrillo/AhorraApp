import React, {useState,useEffect,useCallback} from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TransactionController from '../controllers/TransactionController';
import TransactionFormModal from './TransactionFormModal';
import { useFocusEffect } from '@react-navigation/native';

/*const dummyData = [
    { id: '1', concept: 'Salario Noviembre', amount: 35000.00, isIncome: true },
    { id: '2', concept: 'Venta de artículo', amount: 500.00, isIncome: true },
    { id: '3', concept: 'Pago de Netflix', amount: 189.00, isIncome: false },
    { id: '4', concept: 'Supermercado', amount: 1500.00, isIncome: false },
];*/
export default function TransactionList({ navigation, type }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data,setData]=useState([]);
    /*const data = dummyData.filter(item => 
        type === 'Ingresos' ? item.isIncome : !item.isIncome
    );*/

    const mainColor = type === 'Ingresos' ? '#4CAF50' : '#F44336';
    const isIncomeType = type === 'Ingresos';

    const loadTransaction = useCallback(async ()=>{
        const result= await TransactionController.getFilteredTransactions(type);
        if (result.success){
            setData(result.transactions);
        }else{
            Alert.alert('Error', result.error);
        }
    },[type]);

    useFocusEffect(
        useCallback(()=>{
            loadTransaction();
            return ()=>{}
        },[loadTransaction])
    );
    
    const handleAdd = () => {
        setIsModalVisible(true);
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta transacción?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    style: "destructive", 
                    onPress: async () => {
                        const result = await TransactionController.deleteTransaction(id);
                        if (result.success) {
                            loadTransaction(); 
                        } else {
                            Alert.alert("Error", result.error || "No se pudo eliminar la transacción.");
                        }
                    }
                }
            ]
        );
    };

    const handleSaveSuccess = () => {
        setIsModalVisible(false);
        loadTransaction();
    };

    const renderItem = ({ item }) => (
        <View style={styles.recordItem}>
            <View style={styles.conceptAmountContainer}>
                <Text style={styles.conceptText}>{item.concept}</Text>
                <Text style={[styles.amountText, { color: mainColor }]}>
                    {isIncomeType ? '+' : '-'} ${(item.amount || 0).toFixed(2)}
                </Text>
            </View>
            <Pressable 
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color="#777" /> 
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <TransactionFormModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                isIncomeType={isIncomeType}
                onSaveSuccess={handleSaveSuccess}
            />
            <View style={styles.header}>
                <Text style={styles.title}>{type}</Text>
                <View style={styles.headerButtons}>
                    <Pressable onPress={() => alert('Abrir buscador')} style={styles.iconButton}>
                        <Ionicons name="search-outline" size={28} color="#000" />
                    </Pressable>
                    <Pressable onPress={handleAdd} style={styles.iconButton}>
                        <Ionicons name="add-circle-outline" size={30} color={mainColor} />
                    </Pressable>
                </View>
            </View>

            <View style={[styles.listContainer, { borderColor: mainColor }]}>
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatListContent}
                    />
                ) : (
                    <Text style={styles.emptyText}>No hay registros de {type}.</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 15,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderWidth: 2,
        overflow: 'hidden',
    },
    flatListContent: {
        paddingVertical: 10,
    },
    recordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    conceptAmountContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    conceptText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    deleteButton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#EFEFEF',
    },
    emptyText: {
        textAlign: 'center',
        padding: 20,
        fontSize: 16,
        color: '#777',
    },
});