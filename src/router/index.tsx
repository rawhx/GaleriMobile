import React, { useContext, useEffect, useRef, useState } from 'react';
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
import ProfileLain from '../pages/userLain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailAlbum from '../pages/detailalbum';
import DetailPencarianProfile from '../pages/detailpencarianprofile';
import EditProfile from '../pages/editprofile';
import DetailFotoUserLain from '../pages/detailfotouserlain';
import ViewFavorite from '../pages/favorite';
import ViewMember from '../pages/member';
import Pembayaran from '../pages/member/pembayaran';
import HistoryTransaksi from '../pages/historytransaksi';
import { DataAkun, FotoProfile, UserToken } from '../context/GlobalState';
import DetailLike from '../pages/detaillike';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Tabs = () => {
    const [getDataDetail, setGetDataDetail] = useState({})
    const [jwt, setjwt] = useState()
    const [bottomNavVisible, setBottomNavVisible] = useState(true);
    // const [DataProfile, setDataProfile] = useContext(DataAkun)

    useEffect(() => {
        const getDetailRoute = async () => {
            const datajwt = await AsyncStorage.getItem('cache')
            setjwt(datajwt)
            const user = await getProfile()
            if (user) {
                setGetDataDetail({
                    profile: user.FotoProfil,
                    username: user.Username,
                })
                // setDataProfile({
                //     username: user.Username,
                // })
            }
        }

        getDetailRoute();
    }, []);

    const resetScreen = (navigation, routeName) => {
        navigation.navigate(routeName);
    };

    const ProfileUser = props => {
        if (getDataDetail.profile === ' ' || !getDataDetail.profile) {
            return (
                <>
                    <Icon color={props.color} name="circle-user" size={20} solid />
                </>
            )
        } else {
            return (
                <View>
                    <Image
                        source={{ uri: getDataDetail.profile.startsWith('https://') ? getDataDetail.profile : `data:image/png;base64,${getDataDetail.profile}` }}
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
                tabBarStyle: [style.tabBar, { display: bottomNavVisible ? 'flex' : 'none' }],
            }}>
            <Tab.Screen name="Home" component={TabsHome}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
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
            <Tab.Screen name="search" component={TabsSearch}
                options={{
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarIcon: ({ focused }) => (
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
                })} />
            {jwt ? (
                <>
                    <Tab.Screen name="Add" component={AddFoto}
                        options={{
                            tabBarLabelStyle: {
                                display: 'none'
                            },
                            tabBarIcon: ({ focused }) => (
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
                        })} />
                    <Tab.Screen name="Profile" component={TabsProfile}
                        options={{
                            tabBarLabelStyle: {
                                display: 'none'
                            },
                            tabBarIcon: ({ focused }) => (
                                <View style={focused ? style.icon : {}}>
                                    <ProfileUser color={focused ? 'white' : 'grey'} />
                                </View>
                            )
                        }}
                        listeners={({ navigation }) => ({
                            tabPress: (event) => {
                                event.preventDefault()
                                resetScreen(navigation, 'Profile');
                            },
                        })} />
                </>
            ) : (
                <>
                    <Tab.Screen name="Add" component={BelumLogin}
                        options={{
                            tabBarLabelStyle: {
                                display: 'none'
                            },
                            tabBarIcon: ({ focused }) => (
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
                        })} />
                    <Tab.Screen name="Profile" component={BelumLogin}
                        options={{
                            tabBarLabelStyle: {
                                display: 'none'
                            },
                            tabBarIcon: ({ focused }) => (
                                <View style={focused ? style.icon : {}}>
                                    <ProfileUser color={focused ? 'white' : 'grey'} />
                                </View>
                            )
                        }}
                        listeners={({ navigation }) => ({
                            tabPress: (event) => {
                                event.preventDefault()
                                resetScreen(navigation, 'Profile');
                            },
                        })} />
                </>
            )}
        </Tab.Navigator>
    )
}

const TabsSearch = ({ route, navigation }) => {
    if(route.params?.search){
        useEffect(() => {
            navigation.navigate('TabSearch', { search: { value: route.params?.search.value, label: route.params?.search.label } })
        }, [route.params?.search])
    }

    return (
        <Stack.Navigator
            // initialRouteName='TabSearch'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="TabSearch" component={Search} />
            <Stack.Screen name="TabSearchProfileLain" component={ProfileLain} />
            <Stack.Screen name="TabSearchDetailFoto" component={DetailPencarian} />
            <Stack.Screen name="SearchDetailFotoUserLain" component={DetailFotoUserLain} />
        </Stack.Navigator>
    )
}

const TabsHome = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="TabDefault" component={Home} />
            <Stack.Screen name="ProfileLain" component={ProfileLain} />
            <Stack.Screen name="DetailFoto" component={DetailPencarian} />
            <Stack.Screen name="DetailFotoUserLain" component={DetailFotoUserLain} />
        </Stack.Navigator>
    )
}

const TabsProfile = () => {
    const [getDataDetail, setGetDataDetail] = useState({})

    useEffect(() => {
        const getDetailRoute = async () => {
            const user = await getProfile()
            if (user) {
                setGetDataDetail({
                    profile: user.FotoProfil,
                    username: user.Username
                })
            }
        }
        getDetailRoute();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name="TabProfile" component={Profile} />
            {/* <Stack.Screen name="TabProfile" component={jwt ? Profile : BelumLogin}/> */}
            <Stack.Screen name="TabProfileLain" component={ProfileLain} />
            <Stack.Screen name="TabDetailFotoProfile" component={DetailPencarianProfile} />
        </Stack.Navigator>
    )
}

const Router = () => {
    const [Token, setToken] = useState()
    const [getFotoProfile, setFotoProfile] = useState()
    const [dataProfile, setDataProfile] = useState()
    return (
        <UserToken.Provider value={[Token, setToken]}>
            <FotoProfile.Provider value={[getFotoProfile, setFotoProfile]}>
                <DataAkun.Provider value={[dataProfile, setDataProfile]}>
                    <NavigationContainer>
                        <StatusBar
                            backgroundColor={'#EFF2F7'}
                            barStyle={"dark-content"}
                        />
                        <Stack.Navigator
                            // initialRouteName='SplashScreen'
                            screenOptions={{
                                headerShown: false
                            }}>
                            {/* <Stack.Screen name="SplashScreen" component={Test}/> */}
                            {/* <Stack.Screen name="SplashScreen" component={ProfileLain}/> */}
                            <Stack.Screen name="SplashScreen" component={SplashScreen} />
                            <Stack.Screen name="Welcome" component={Welcome} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />

                            <Stack.Screen name="Tabs" component={Tabs} />

                            <Stack.Screen name="DetailImg" component={DetailPencarian} />

                            <Stack.Screen name="DetailAlbum" component={DetailAlbum} />
                            <Stack.Screen name="EditProfile" component={EditProfile} />
                            <Stack.Screen name="ViewFavorite" component={ViewFavorite} />
                            <Stack.Screen name="Member" component={ViewMember} />
                            <Stack.Screen name="Pembayaran" component={Pembayaran} />
                            <Stack.Screen name="HistoryTransaksi" component={HistoryTransaksi} />
                            <Stack.Screen name="LikeDetail" component={DetailLike} />
                            <Stack.Screen name="DetailFotoAlbum" component={DetailPencarianProfile} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </DataAkun.Provider>
            </FotoProfile.Provider>
        </UserToken.Provider>
    )
}

const style = StyleSheet.create({
    tabBar: {
        padding: 0,
        height: 50,
        backgroundColor: assets.colors.header,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowOpacity: 0,
        shadowRadius: 0,
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