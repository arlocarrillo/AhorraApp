import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Screens/HomeScreen';
import IngresosScreen from './Screens/IngresosScreen';
import EgresosScreen from './Screens/EgresosScreen';
import PerfilScreen from './Screens/PerfilScreen';
import GraficasScreen from './Screens/GraficasScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HomeScreen'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = 'home';
            } else if (route.name === 'IngresosScreen') {
              iconName = 'cash';
            } else if (route.name === 'EgresosScreen') {
              iconName = 'card';
            } else if (route.name === 'PerfilScreen') {
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
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Tab.Screen name="IngresosScreen" component={IngresosScreen} options={{ title: 'Ingresos' }} />
        <Tab.Screen name="EgresosScreen" component={EgresosScreen} options={{ title: 'Egresos' }} />
        <Tab.Screen name="PerfilScreen" component={PerfilScreen} options={{ title: 'Perfil' }} />
        <Tab.Screen 
          name="GraficasScreen" 
          component={GraficasScreen} 
          options={{ 
            tabBarButton: () => null,
            headerShown: false,
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
