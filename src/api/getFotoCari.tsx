import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env"

const getFotoCari = async (data) => {
  const jwtToken = await AsyncStorage.getItem('Token');
  const response = await axios.get(
    `${BASE_URL}/foto-cari?foto_id=${data.foto_id}&membership=true&keduanya=true&page=1&limit=10`,
    {
      headers: { 
        Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
      } 
    }
  )
  return response.data.Data[0];
}

export default getFotoCari
