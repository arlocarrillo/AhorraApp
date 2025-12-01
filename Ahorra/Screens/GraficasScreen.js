import React, {useState, useEffect, useCallback} from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import TransactionController from '../controllers/TransactionController';

const screenWidth=Dimensions.get('window').width;

export default function GraficasScreen() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async ()=>{
        setLoading(true);
        const result = await TransactionController.getFinancialSummary();
        if (result.success){
            setSummary(result.summary);
        }else{
            console.error(result.error);
        }
        setLoading(false);
    },[]);

    useFocusEffect(
        useCallback(()=>{
            fetchData();
            return ()=>{};
        },[fetchData])
    );

    if (loading){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#510390ff" />
                <Text style={styles.loadingText}>Cargando resumen financiero...</Text>
            </View>
        );
    }

    if (!summary || (summary.totalIncome === 0 && summary.totalExpense === 0)) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Aún no hay transacciones para generar gráficas.</Text>
            </View>
        );
    }

    const pieChartData = [
        {
            name: 'Ingresos',
            population: summary.totalIncome,
            color: '#4CAF50', // Verde
            legendFontColor: '#333',
            legendFontSize: 15,
        },
        {
            name: 'Egresos',
            population: summary.totalExpense,
            color: '#F44336', // Rojo
            legendFontColor: '#333',
            legendFontSize: 15,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
    };

    const balanceColor = summary.balance >= 0 ? '#4CAF50' : '#F44336';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Análisis de Saldo</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Balance General</Text>
                    <Text style={[styles.balanceText, { color: balanceColor }]}>
                        $ {summary.balance.toFixed(2)}
                    </Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Ingresos:</Text>
                        <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
                            $ {summary.totalIncome.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Egresos:</Text>
                        <Text style={[styles.summaryValue, { color: '#F44336' }]}>
                            $ {summary.totalExpense.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.chartTitle}>Distribución Ingresos vs. Egresos</Text>
                
                <View style={styles.chartContainer}>
                    <PieChart
                        data={pieChartData}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 5]}
                        absolute
                    />
                </View>
            </ScrollView>
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#510390ff',
    },
    summaryCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    balanceText: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
        color: '#333',
        alignSelf: 'flex-start',
    },
    chartContainer: {
        width: screenWidth - 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        elevation: 3,
        marginBottom: 20,
    },
    scrollContainer:{
        flex:1,
        width:'100%'
    }
});