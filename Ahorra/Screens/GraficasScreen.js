import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function GraficasScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Análisis de Saldo</Text>
            <Text style={styles.subtitle}>Aquí irán tus gráficas y estadísticas.</Text>
            {/* Espacio para gráficos */}
            <View style={styles.chartPlaceholder}>
                <Text style={{ color: '#fff' }}>[Espacio para Gráfico Circular/Barras]</Text>
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
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        color: '#777',
    },
    chartPlaceholder: {
        width: '90%',
        height: 300,
        backgroundColor: '#00BCD4', // Color de énfasis para el espacio de la gráfica
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});