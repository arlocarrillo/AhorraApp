import { View, Text, StyleSheet, Alert, ScrollView, TextInput, Pressable } from 'react-native';
import React, {useState} from 'react';
import UsuarioController from '../controllers/UsuarioController';

export default function InicioSeScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async ()=>{
        if (email.trim()==='' || password.trim()===''){
            Alert.alert('Error', 'Por favor, complete todos los campos.')
        }
        const respuesta= await UsuarioController.iniciarSesion(email.trim(), password.trim());
        if (respuesta.success){
            Alert.alert('Exito', 'Inicio de sesión exitoso.');
            setEmail('');
            setPassword('');
            navigation.replace('TabRoutes', { screen: 'Home' });
        }else{
            Alert.alert('Error', respuesta.error)
        }
    }
    /*const mostrarAlerta = () => {
        if(nombre === '' || password === ''){
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            //alert('Error', 'Por favor, complete todos los campos.');
        }else if(nombre.trim()==''){
            Alert.alert('Error', 'El nombre no puede estar vacío.');
            //alert('Error', 'El nombre no puede estar vacío.');
        }else if(password.trim()==''){
            Alert.alert('Error', 'La contraseña no puede estar vacía.');
            //alert('Error', 'La contraseña no puede estar vacía.');
        }else if(nombre.trim() === 'Arlo' && password.trim() === '1234'){
            Alert.alert('Éxito', 'Inicio de sesión exitoso.');
            //alert('Éxito', 'Inicio de sesión exitoso.');
        }else{
            Alert.alert('Error', 'Nombre o contraseña incorrectos.');
            //alert('Error', 'Nombre o contraseña incorrectos.');
        }
    }*/
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <ScrollView contentContainerStyle={styles.formContent}>
                <Text style={styles.formLabel}>Correo Electrónico</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Introduce tu email"
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
                                    
                <Text style={styles.formLabel}>Contraseña</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Introduce tu contraseña"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </ScrollView>
            <Pressable style={styles.actionButton} onPress={handleLogin}>
                <Text style={styles.textButton}>Iniciar Sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 0,
        color: '#000000ff',
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
    input:{
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    actionButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#510390ff',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffffff',
    },
});