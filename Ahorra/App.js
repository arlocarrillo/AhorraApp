import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AutenticacionScreen from './Screens/AutenticacionScreen';
import InicioSeScreen from './Screens/InicioSeScreen';
import RegistroScreen from './Screens/RegistroScreen';
import HomeScreen from './Screens/HomeScreen';
import IngresosScreen from './Screens/IngresosScreen';
import EgresosScreen from './Screens/EgresosScreen';
import PerfilScreen from './Screens/PerfilScreen';
import GraficasScreen from './Screens/GraficasScreen'; 
import PresupuestosScreen from './Screens/PresupuestosScreens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 
function TabRoutes() {
    return (
      <Tab.Navigator
        initialRouteName='Home' 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Ingresos') {
              iconName = 'cash';
            } else if (route.name === 'Egresos') {
              iconName = 'card';
            } else if (route.name === 'Perfil') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#510390ff',
          tabBarInactiveTintColor: '#000000ff',
          tabBarStyle:{
            paddingBottom: 5,
            height: 60,
          },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
          <Tab.Screen name="Ingresos" component={IngresosScreen} options={{ title: 'Ingresos' }} />
          <Tab.Screen name="Egresos" component={EgresosScreen} options={{ title: 'Egresos' }} />
          <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="AutenticacionScreen"
                screenOptions={{ 
                    headerShown: false,
                }}
            >
              <Stack.Screen name="AutenticacionScreen" component={AutenticacionScreen} />
              <Stack.Screen name="InicioSeScreen" component={InicioSeScreen} />
              <Stack.Screen name="RegistroScreen" component={RegistroScreen} />

              <Stack.Screen name="TabRoutes" component={TabRoutes} />
              <Stack.Screen name="GraficasScreen" component={GraficasScreen} />
              <Stack.Screen name="PresupuestosScreen" component={PresupuestosScreen} />
              
            </Stack.Navigator>
        </NavigationContainer>
    );
}
