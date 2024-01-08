import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Profile, Welcome } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName='Home'
        screenOptions={{
            headerShown: false,
            tabBarStyle: style.tabBar,
        }}>
            <Tab.Screen name="Home" component={Home} 
            options={{
                // tabBarItemStyle: {
                //     height: 0
                // },
                tabBarIcon: ({focused: boolean}) => (
                    <View>
                        <Text>a</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} 
            options={{
                // tabBarItemStyle: {
                //     height: 0
                // },
                tabBarIcon: ({focused: boolean}) => (
                    <View>
                        <Text>ab</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome' 
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Tabs" component={Tabs}/>
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    tabBar: {
        padding: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }
})

export default Router