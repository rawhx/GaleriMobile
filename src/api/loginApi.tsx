import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { Alert } from "react-native"
import config from "../../config"


export const loginApi = async (data, navigation) => {
    // try {
        let url = `${config.Base_url}/login/users?email=${data.email}&password=${data.password}`
        const res = await axios.post(url)
        // .then(async(res)=>{
            if (res.data.Admin) { 
                return {
                    IsError: true,
                    ErrMsg: 'Potong gaji? 😊🙏'
                }
            }
            if (!res.data.IsError) {
                let jwt = res.data.Data
                await AsyncStorage.setItem('cache', jwt)
                // navigation.replace("Tabs")
            }
            return res.data
        // }).catch((err)=>console.error(err))
    // } catch (error) {
    //     Alert.alert('error')
    //     throw error
    // }
}