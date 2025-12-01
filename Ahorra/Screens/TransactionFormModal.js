import React, { useState } from 'react';
import { 
    Modal, View, Text, TextInput, Button, 
    StyleSheet, Pressable, Alert 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TransactionController from '../controllers/TransactionController';

export default function TransactionFormModal({ 
    visible, 
    onClose, 
    isIncomeType,
    onSaveSuccess 
}) {
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const mainColor = isIncomeType ? '#4CAF50' : '#F44336';
    const titleText = isIncomeType ? 'Nuevo Ingreso' : 'Nuevo Egreso';

    const handleSave = async () => {
        const parsedAmount = parseFloat(amount.replace(',', '.'));

        if (!concept.trim() || parsedAmount <= 0 || isNaN(parsedAmount)) {
            Alert.alert('Error', 'Por favor, ingrese un concepto válido y un monto mayor a cero.');
            return;
        }

        setLoading(true);
        const result = await TransactionController.addTransaction(
            concept.trim(), 
            parsedAmount, 
            isIncomeType
        );
        setLoading(false);

        if (result.success) {
            Alert.alert('Éxito', `Se ha guardado el ${titleText} correctamente.`);
            setConcept('');
            setAmount('');
            onSaveSuccess();
        } else {
            Alert.alert('Error', result.error || 'Hubo un error al guardar la transacción.');
        }
    };

    const handleCloseModal = () => {
        setConcept('');
        setAmount('');
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, {borderColor: mainColor}]}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, {color: mainColor}]}>{titleText}</Text>
                        <Pressable onPress={handleCloseModal} style={styles.closeButton}>
                            <Ionicons name="close-circle-outline" size={30} color="#777" />
                        </Pressable>
                    </View>

                    <Text style={styles.label}>Concepto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Salario, Renta, Supermercado"
                        value={concept}
                        onChangeText={setConcept}
                    />

                    <Text style={styles.label}>Monto ($)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Pressable
                        style={[styles.saveButton, {backgroundColor: mainColor}]}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        <Text style={styles.textButton}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 3,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    saveButton: {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        marginTop: 10,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});