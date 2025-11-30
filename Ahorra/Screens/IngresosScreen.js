import { Text, StyleSheet, View, Pressable } from 'react-native'
import TransactionList from './TransactionList';

export default function IngresosScreen() {
    return (
      <TransactionList type="Ingresos" />
    )
}

const styles = StyleSheet.create({});