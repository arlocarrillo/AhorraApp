import { Text, StyleSheet, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react';
import UsuarioController from '../controllers/UsuarioController';

export default function PerfilScreen({navigation}) {
    const [userData, setUserData] = useState({nombre:'', email:'', telefono:''});
    useEffect(()=>{
        const user=UsuarioController.getCurrentUser();
        if(user){
            setUserData(user);
        }
    },[]);

    const navigateToPresupuestos = ()=>{
        navigation.navigate('PresupuestosScreen');
    };

    const handleLogout = () => {
        UsuarioController.logout();
        navigation.replace('AutenticacionScreen');
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.container2}>
            <Text style={styles.datos}>Nombre: {userData.nombre}</Text>
            <Text style={styles.datos}>Correo Electrónico: {userData.email}</Text>
            <Text style={styles.datos}>Teléfono: {userData.telefono}</Text>
            <Pressable style={styles.actionButton} onPress={navigateToPresupuestos}>
                <Text style={styles.textButton}>Mis presupuestos</Text>
            </Pressable>
            <Pressable style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.textButton}>Cerrar Sesión</Text>
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