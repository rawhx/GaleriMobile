import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { BASE_URL } from "@env"

const populerApi = async ({ page = 1 }) => {
    const jwtToken = await AsyncStorage.getItem('Token')
    
    const url = jwtToken ? `/foto-trending/user?page=${page}&limit=20` : `/foto-trending/guest?page=${page}&limit=20`
    const res = await axios.get(BASE_URL + url, {
        headers: { 
            Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
        } 
    })
    return res.data
}

export default populerApi