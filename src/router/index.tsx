import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Profile, Register, Search, SplashScreen, Welcome } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, StatusBar, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6"
import { assets } from '../assets'
import DetailPencarian from '../pages/detailpencarian';
import { Image } from 'react-native-ui-lib';
import { getProfile } from '../api/api';
import { BelumLogin } from '../components';
import AddFoto from '../pages/addfoto';
import Test from '../pages/test';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
    const [getDataDetail, setGetDataDetail] = useState({})

    const getDetailRoute = async () => {
        const user = await getProfile()
        if (user) {
            setGetDataDetail({
                profile: user.FotoProfil,
                username: user.Username
            })
        }
    } 

    useEffect(() => {
        getDetailRoute();
    }, []);

    const resetScreen = (navigation, routeName) => {
        navigation.navigate(routeName);
    };

    const ProfileUser = props => {
        if (getDataDetail.profile === ' ' || !getDataDetail.profile) {
            return (
                <Icon color={props.color} name="circle-user" size={20} solid />
            )
        }  else {
            return (
                <View>
                    <Image
                    source={{ uri: `data:image/png;base64,${getDataDetail.profile}` }}
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 60,
                    }}
                    />
                </View>
            )
        }
    }

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
            }}
            listeners={({ navigation }) => ({
                tabPress: (event) => {
                  event.preventDefault()
                  resetScreen(navigation, 'Home');
                },
            })} />
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
            }}
            listeners={({ navigation }) => ({
                tabPress: (event) => {
                  event.preventDefault()
                  resetScreen(navigation, 'search');
                },
            })}/>
            <Tab.Screen name="Add" component={getDataDetail.username ? AddFoto : BelumLogin} 
            options={{
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <Icon color={focused ? 'white' : 'grey'} name="square-plus" size={20} solid />
                    </View>
                )
            }}
            listeners={({ navigation }) => ({
                tabPress: (event) => {
                  event.preventDefault()
                  resetScreen(navigation, 'Add');
                },
            })}/>
            <Tab.Screen name="Profile" component={getDataDetail.username ? Profile : BelumLogin} 
            options={{
                tabBarLabelStyle: {
                    display: 'none'
                },
                tabBarIcon: ({focused}) => (
                    <View style={focused ? style.icon : {}}>
                        <ProfileUser color={focused ? 'white' : 'grey'}/>
                    </View>
                )
            }}
            listeners={({ navigation }) => ({
                tabPress: (event) => {
                  event.preventDefault()
                  resetScreen(navigation, 'Profile');
                },
            })}/>
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
            initialRouteName='SplashScreen'
            screenOptions={{
                headerShown: false
            }}>
                {/* <Stack.Screen name="SplashScreen" component={Test}/> */}
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
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