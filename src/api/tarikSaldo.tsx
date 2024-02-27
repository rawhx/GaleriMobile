import axios from "axios"
import config from "../../config"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const tarikSaldo = async (data) => {
    const jwtToken = await AsyncStorage.getItem('cache')
    const res = await axios.post(
        `${config.Base_url}/tarik-saldo`, data,
        {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    )

    return res.data
}