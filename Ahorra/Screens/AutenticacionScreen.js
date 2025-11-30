import { Text, StyleSheet, View, Pressable } from 'react-native'

export default function AutenticacionScreen({navigation}) {
    const handleLogin = () =>{navigation.navigate('InicioSeScreen');};
    const handleRegister = () =>{navigation.navigate('RegistroScreen');};
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Text style={styles.logoText}>A+</Text>
        </View>
        <View style={styles.buttonWrapper}>
            <Pressable style={[ styles.actionButton, styles.loginButton ]} onPress={handleLogin}>
                <Text style={styles.textButton}>Iniciar Sesión</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.registerButton]} onPress={handleRegister}>
                <Text style={[styles.textButton, styles.registerText]}>Registrarse</Text>
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
        justifyContent: 'space-around',
        paddingHorizontal: 30,
    },
    logoContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#510390ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffffff',
    },
    buttonWrapper: {
        width: '100%',
        marginBottom: 50,
    },
    actionButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#510390ff',
    },
    registerButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#510390ff',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: 'transparent', 
        borderWidth: 2,
        borderColor: '#510390ff',
    },
    textButton: {
        color: '#ffffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerText: {
        color: '#510390ff',
    },
});