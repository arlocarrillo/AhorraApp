import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function PresupuestosScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MIS PRESUPUESTOS</Text>
            <View style={styles.chartPlaceholder}>
                <Text style={{ color: '#fff' }}>[Espacio para sliders]</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#510390ff',
    },
    chartPlaceholder: {
        width: '90%',
        height: 300,
        backgroundColor: '#00BCD4',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});