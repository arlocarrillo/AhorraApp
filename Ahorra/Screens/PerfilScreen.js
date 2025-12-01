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
        <View style={styles.logoContainer}>
            <Text style={styles.logoText}>A+</Text>
        </View>
        <View style={styles.dataCard}>
            <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Nombre:</Text>
                <Text style={styles.dataValue}>{userData.nombre}</Text>
            </View>

            <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Correo Electrónico:</Text>
                <Text style={styles.dataValue}>{userData.email}</Text>
            </View>

            <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Teléfono:</Text>
                <Text style={styles.dataValue}>{userData.telefono}</Text>
            </View>
        </View>
        
        <View style={styles.buttonContainer}>
            <Pressable style={styles.actionButton} onPress={navigateToPresupuestos}>
                <Text style={styles.textButton}>Mis Presupuestos</Text>
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
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000ff',
        paddingBottom: 50,
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
    dataCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    dataLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    dataValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        maxWidth: '60%',
        textAlign: 'right',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    actionButton:{
        width: '100%',
        backgroundColor: '#510390ff',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        marginTop: 0,
    },
    logoutButton: {
        backgroundColor: '#E53935',
        marginTop: 20,
    },
});