import axios from "axios";
import { BASE_URL } from "@env"

const kategoriApi = async () => {
    const response = await axios.get(`${BASE_URL}/kategori-cari?page=1&limit=10`,)
    return response.data.Data;
}

export default kategoriApi