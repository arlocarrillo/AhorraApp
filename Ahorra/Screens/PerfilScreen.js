import { Text, StyleSheet, View, Pressable } from 'react-native'

export default function PerfilScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.container2}>
            <Text style={styles.datos}>Nombre: </Text>
            <Text style={styles.datos}>Correo Electrónico: </Text>
            <Text style={styles.datos}>Teléfono: </Text>
            <Pressable style={styles.actionButton}>
                <Text style={styles.textButton}>Mis presupuestos</Text>
            </Pressable>
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
    container2:{
        flex: 1,
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
    textButton:{
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
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