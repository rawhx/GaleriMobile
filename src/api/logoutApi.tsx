import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Alert } from "react-native"


export const logoutApi = async (navigation) => {
    try {
        await AsyncStorage.removeItem('cache')
        navigation.replace("Welcome")
    } catch (error) {
        Alert.alert('error')
    }
}