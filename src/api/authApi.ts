import { loginType } from "@/utils/interfaces/Interfaces";
import { API } from "./api";

export const loginAPI: loginType = (email, password) => {
    return API.post(
        '/login', { email, password }, 
        { headers: 
            { "Content-Type": "application/json" } 
        }
    )
    .then(res => res.data)
    .catch(err => { throw err.response.data })
}
