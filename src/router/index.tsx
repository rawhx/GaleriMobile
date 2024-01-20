import React, { useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Profile, Register, Search, Welcome } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from '../assets'
import DetailPencarian from '../pages/detailpencarian';

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
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <Icon color={focused ? 'white' : 'grey'} name="house" size={20} light />
                    </View>
                )
            }}/>
            <Tab.Screen name="search" component={Search} 
            options={{
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <Icon color={focused ? 'white' : 'grey'} name="compass" size={20} solid />
                    </View>
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} 
            options={{
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <Icon color={focused ? 'white' : 'grey'} name="square-plus" size={20} solid />
                    </View>
                )
            }}/>
            <Tab.Screen name="Add" component={Profile} 
            options={{
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <Icon color={focused ? 'white' : 'grey'} name="circle-user" size={20} solid />
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor={'#EFF2F7'}
                barStyle={"dark-content"}
            />
            <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                
                <Stack.Screen name="Tabs" component={Tabs}/>
                <Stack.Screen name="DetailFoto" component={DetailPencarian}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const style = StyleSheet.create({
    tabBar: {
        padding: 0,
        height: 50,
        backgroundColor:assets.colors.header,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOpacity: 0,
        shadowRadius: 0
    },
    icon: {
        borderBottomColor: 'black',
        borderBottomWidth: 2.5,
        borderColor: assets.colors.white,
        borderRadius: 2.5,
        paddingVertical: 5,
    }
})

export default Router