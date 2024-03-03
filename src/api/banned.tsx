import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export const banned = async () => {
    // const navigation = useNavigation()
    const jwtToken = await AsyncStorage.getItem('cache')
    await AsyncStorage.removeItem('cache')
    // navigation.navigate("Welcome")
}