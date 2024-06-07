import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { BASE_URL } from "@env"

const getAllFoto = async ({ page = 1, search = null }) => {
    console.log('====================================');
    console.log(search);
    console.log('====================================');
    const jwtToken = await AsyncStorage.getItem('Token')
    
    const url = jwtToken ? `/foto-cari?membership=true&keduanya=true&page=${page}&limit=20${search ? `&judul_foto=${search}` : null}` : `/foto-cari/guest?page=${page}&limit=20${search ? `&judul_foto=${search}` : null}`
    const res = await axios.get(BASE_URL + url, {
        headers: { 
            Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
        } 
    })
    return res.data
}

export default getAllFoto