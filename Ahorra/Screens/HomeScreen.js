import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Pressable, Modal, TextInput, ScrollView, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsuarioController from '../controllers/UsuarioController';

const lastTransactions = [
    { id: '1', concept: 'Salario Noviembre', amount: 35000.00, type: 'Ingreso' },
    { id: '2', concept: 'Supermercado', amount: 1500.00, type: 'Egreso' },
    { id: '3', concept: 'Renta', amount: 7000.00, type: 'Egreso' },
    { id: '4', concept: 'Venta de artículo', amount: 500.00, type: 'Ingreso' },
];

export default function HomeScreen({navigation}) {
    const [userData, setUserData] = useState({nombre:''})
    useEffect(()=>{
        const user =UsuarioController.getCurrentUser();
        if(user){
            setUserData(user);
        }
    },[]);

    const [modalPago, setModalPago] = useState(false);
    const [modalMovimientos, setModalMovimientos] = useState(false);

    const [concepto, setConcepto] = useState('');
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const navigateToGraficas = () => {
        navigation.navigate('GraficasScreen');
    };
    const navigateToPresupuestos = ()=>{
        navigation.navigate('PresupuestosScreen');
    };
    const handleSavePago = () => {
        console.log("Guardando Pago:", { concepto, fecha, monto });
        setConcepto('');
        setFecha('');
        setMonto('');
        setModalPago(false);
    };
    const renderMovementItem = ({ item }) => {
        const isIncome = item.type === 'Ingreso';
        const color = isIncome ? '#4CAF50' : '#F44336';
        return (
            <View style={styles.movementItem}>
                <View style={styles.movementTextContainer}>
                    <Text style={styles.movementConcept}>{item.concept}</Text>
                    <Text style={[styles.movementAmount, { color: color }]}>
                        {isIncome ? '+' : '-'} ${item.amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenid@</Text>
        <Text style={styles.username}>{userData.nombre}</Text>

        <View style={styles.menu}>
            <Pressable style={styles.actionButton} onPress={()=> setModalPago('pago')}>
                <Text style={styles.textButton}> Programar Pago</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={()=> setModalMovimientos('movimientos')}>
                <Text style={styles.textButton}>Movimientos</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={navigateToPresupuestos}>
                <Text style={styles.textButton}>Mis Presupuestos</Text>
            </Pressable>
            <Pressable style={styles.balanceButton} onPress={navigateToGraficas}>
                <Text style={styles.balanceText}>Saldo: $15,000</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPago === 'pago' }
                onRequestClose={() => {
                    setModalPago(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setModalPago(false)} style={styles.modalCloseIcon}>
                            <Ionicons name="arrow-back" size={30} color="#000" />
                        </Pressable>
                        <Text style={styles.modalTitle}>Programar Pago</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.formContent}>
                        <Text style={styles.formLabel}>Concepto</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Ej. Pago de luz" 
                            value={concepto}
                            onChangeText={setConcepto}
                        />
                        
                        <Text style={styles.formLabel}>Fecha</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="DD/MM/AAAA" 
                            value={fecha}
                            onChangeText={setFecha}
                        />
                        
                        <Text style={styles.formLabel}>Monto</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="0.00" 
                            keyboardType="numeric" 
                            value={monto}
                            onChangeText={setMonto}
                        />
                    </ScrollView>
                    <Pressable style={styles.saveButton} onPress={handleSavePago}>
                        <Text style={styles.saveButtonText}>Guardar Pago</Text>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalMovimientos === 'movimientos'}
                onRequestClose={() => {setModalMovimientos(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setModalMovimientos(false)} style={styles.modalCloseIcon}>
                            <Ionicons name="arrow-back" size={30} color="#000" />
                        </Pressable>
                        <Text style={styles.modalTitle}>Últimos Movimientos</Text>
                    </View>
                    <View style={styles.movementListContainer}>
                        <FlatList
                            data={lastTransactions}
                            renderItem={renderMovementItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Pressable style={styles.saveButton} onPress={()=> setModalMovimientos(false)}>
                        <Text style={styles.saveButtonText}>Cerrar</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 0,
        color: '#000000ff',
    },
    username:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#510390ff',
    },
    menu:{
        width: '100%',
        alignItems: 'center',
    },
    actionButton:{
        width: '100%',
        backgroundColor: '#510390ff',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 50,
        alignItems: 'center',
    },
    balanceButton: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'flex-start',
    },
    balanceText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000000ff',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalCloseIcon: {
        paddingRight: 15,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    formContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 8,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#510390ff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    movementListContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#E0F7FA',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    movementItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CFD8DC',
    },
    movementTextContainer: {
        flex: 1,
    },
    movementConcept: {
        fontSize: 16,
        color: '#333',
    },
    movementAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textButton:{
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input:{
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    formText:{
        fontSize: 16,
        marginTop: 20,
        color: '#000000ff',
    },
});