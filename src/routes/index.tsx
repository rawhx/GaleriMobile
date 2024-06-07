import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { DetailFoto, Favorite, Home, Login, Profile, Register, Search, SplashScreen, Welcome } from "../pages";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserGlobalVar } from "../context/globalVar";
import { assets } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser, faCompass, faHouse, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfileApi } from "../api";
import { NotSignIn } from "../components";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    const [userglobal, setUserGlobal] = useContext(UserGlobalVar);
    const ProfileUser = props => {
        if (userglobal.FotoProfil === ' ' || !userglobal.FotoProfil) {
            return (
                <>
                    <FontAwesomeIcon icon={faCircleUser} color={props.focused ? 'white' : assets.colors.fosil} size={20} />
                </>
            )
        } else {
            return (
                <View>
                    <Image
                        source={{ uri: userglobal.FotoProfil.startsWith('https://') ? userglobal.FotoProfil : `data:image/png;base64,${userglobal.FotoProfil}` }}
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
                tabBarStyle: [style.tabBar],
                tabBarHideOnKeyboard: true
            }}>
            <Tab.Screen name="Home" component={TabsHome}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={focused ? style.icon : {}}>
                            <FontAwesomeIcon icon={faHouse} color={focused ? 'white' : assets.colors.fosil} size={20} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Search" component={TabsSearch}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={focused ? style.icon : {}}>
                            <FontAwesomeIcon icon={faCompass} color={focused ? 'white' : assets.colors.fosil} size={20} />
                        </View>
                    )   
                }}
            />
            <Tab.Screen name="Add" component={userglobal.Username ? Home : NotSignIn}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={focused ? style.icon : {}}>
                            <FontAwesomeIcon icon={faSquarePlus} color={focused ? 'white' : assets.colors.fosil} size={20} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Profil" component={userglobal.Username ? Profile : NotSignIn}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={focused ? style.icon : {}}>
                            <ProfileUser focused={focused} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const StackHome = createNativeStackNavigator()
const TabsHome  = () => {
    return (
        <StackHome.Navigator
            initialRouteName='TabHome'
            screenOptions={{
                headerShown: false
            }}>
            <StackHome.Screen name="TabHome" component={Home} />
            <StackHome.Screen name="HomeDetailFoto" component={DetailFoto} />
        </StackHome.Navigator>
    )
}

const TabSearch = createNativeStackNavigator()
const TabsSearch  = () => {
    return (
        <TabSearch.Navigator
            initialRouteName='TabSearch'
            screenOptions={{
                headerShown: false
            }}>
            <TabSearch.Screen name="TabSearch" component={Search} />
            <TabSearch.Screen name="SearchDetailFoto" component={DetailFoto} />
        </TabSearch.Navigator>
    )
}

const TabProfile = createNativeStackNavigator()

const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor={'#EFF2F7'}
                barStyle={"dark-content"}
            />
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Favorite" component={Favorite} />
                <Stack.Screen name="DetailFoto" component={DetailFoto} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route

const style = StyleSheet.create({
    tabBar: {
        padding: 0,
        height: 50,
        backgroundColor: '#00020F',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOpacity: 0,
        shadowRadius: 0,
    },
    icon: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        borderColor: 'white',
        borderRadius: 2,
        paddingVertical: 5,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})