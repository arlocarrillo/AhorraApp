import { Text, StyleSheet, View, Pressable } from 'react-native'

export default function PerfilScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View>
            <Text style={styles.datos}>Nombre: </Text>
            <Text style={styles.datos}>Correo Electrónico: </Text>
            <Text style={styles.datos}>Teléfono: </Text>
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
    datos:{
        fontSize: 18,
        marginBottom: 10,
        color: '#000000ff',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000ff',
        paddingBottom: 50,
    },
});