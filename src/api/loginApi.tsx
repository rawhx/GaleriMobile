import axios from "axios"

import { BASE_URL } from "@env"

const loginApi = async (data) => {
    const res = await axios.post(`${BASE_URL}/login/users?email=${data.email}&password=${data.password}`) 
    if (res.data.Admin) { 
        return {
            IsError: true,
            ErrMsg: 'Potong gaji? 😊🙏'
        }
    }
    return res.data
}

export default loginApi