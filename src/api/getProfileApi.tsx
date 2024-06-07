import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env"

const getProfileApi = async () => {
    const jwtToken = await AsyncStorage.getItem('Token');

    if (jwtToken) {
      const response = await axios.get(
        `${BASE_URL}/get-profil`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        }
      )
      return response.data.Data[0];
    }
}

export default getProfileApi
