import { Text, StyleSheet, View, Pressable } from 'react-native'
import TransactionList from './TransactionList';
export default function EgresosScreen() {
    return (
      <TransactionList type="Egresos" />
    )
}

const styles = StyleSheet.create({});