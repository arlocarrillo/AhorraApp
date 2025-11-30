import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';

export default function RegistroScreen() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const mostrarAlerta = () => {
        if(nombre === '' || password === '' || email === '' || telefono === '' || confirmPassword === ''){
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            //alert('Error', 'Por favor, complete todos los campos.');
        }else if(password !== confirmPassword){
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            //alert('Error', 'Las contraseñas no coinciden.');
        }else if(!email.includes('@') || !email.includes('.com')){
            Alert.alert('Error', 'Por favor, ingrese un email válido.');
            //alert('Error', 'Por favor, ingrese un email válido.');
        }else if(telefono.trim().length < 10 || telefono.trim().length > 10){
            Alert.alert('Error', 'Por favor, ingrese un número de teléfono válido.');
            //alert('Error', 'Por favor, ingrese un número de teléfono válido.');
        }else if(nombre.trim() !== '' && password.trim() !== '' && email.trim() !== '' && telefono.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword && email.includes('@') && email.includes('.com') && telefono.trim().length == 10){
            Alert.alert('Éxito', 'Inicio de sesión exitoso.');
            //alert('Éxito', 'Inicio de sesión exitoso.');
        }else{
            Alert.alert('Error', 'Nombre o contraseña incorrectos.');
            //alert('Error', 'Nombre o contraseña incorrectos.');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <ScrollView contentContainerStyle={styles.formContent}>
                <Text style={styles.formLabel}>Nombre</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Introduce tu nombre" 
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.formLabel}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="example@mail.com" 
                    keyboardType="email-address" 
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.formLabel}>Teléfono</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="4421234567"
                    keyboardType="phone-pad" 
                    value={telefono}
                    onChangeText={setTelefono}
                />
                                    
                <Text style={styles.formLabel}>Contraseña</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Introduce tu contraseña"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <Text style={styles.formLabel}>Confirmar Contraseña</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                />
            </ScrollView>
            <Pressable style={styles.actionButton} onPress={mostrarAlerta}>
                <Text style={styles.textButton}>Registrarse</Text>
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