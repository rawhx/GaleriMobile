import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@env"

const getProfileTabApi = async ({page}) => {
    const jwtToken = await AsyncStorage.getItem('Token');

    const responseFoto = await axios.get(
      `${BASE_URL}/foto-cari/profil?membership=false&page=${page[0]}&limit=15`,
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      }
    )
    const responseMember = await axios.get(
      `${BASE_URL}/foto-cari/profil?membership=true&page=${page[1]}&limit=15`,
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      }
    )
    const responseGaleri = await axios.get(
      `${BASE_URL}/album-cari?page=${page[2]}&limit=4`,
      {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      }
    )

    const res = {
      'Foto': responseFoto.data.Data,
      'Member': responseMember.data.Data,
      'Album': responseGaleri.data.Data
    }

    return res
}

export default getProfileTabApi
