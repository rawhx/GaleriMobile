import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";
import axios from "axios";

export const editAlbum = async (data) => {
    const jwtToken = await AsyncStorage.getItem('cache')
    console.log('====================================');
    console.log('prosess edit album');
    console.log(data);
    console.log('====================================');
    const res = await axios.patch(
        `${config.Base_url}/album-edit`,
        data,
        {
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
    );

    console.log('====================================');
    console.log('res edit album', res.data);
    console.log('====================================');

    return res.data
}