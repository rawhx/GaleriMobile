import { loginApi } from "./loginApi";
import { logoutApi } from "./logoutApi";
import { getProfile } from "./getProfileApi";
import { getImgAkun } from "./getImgProfileApi";
import { getUserImg } from "./getUserImg";
import { getUserCari } from "./getUserCari";
import { getFollowCariApi } from "./getFollowCari";
import { getKomentarApi } from "./getKomentarApi";
import { countPostingan } from "./countPostingan";
import { kategoriApi } from "./kategoriApi";
import { addKomentar } from "./addKomentar";

export { addKomentar as postKomentar, kategoriApi, countPostingan, loginApi as LoginApi, logoutApi, getProfile, getImgAkun, getUserImg, getUserCari, getFollowCariApi, getKomentarApi }