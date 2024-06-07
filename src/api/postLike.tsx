import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env"

const postLike = async (data) => {
    const jwtToken = await AsyncStorage.getItem('Token');

    if (jwtToken) {
      const response = await axios.post(
        `${BASE_URL}/like-foto`,
        {
          foto_id: data.foto_id,
        },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      return response.data;
    }
}

export default postLike
