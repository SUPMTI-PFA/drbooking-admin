import { API } from "./api";

export const doctorsAPI = () => {
    return API.get(
        '/users', {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        params:{
            "accountType": "doctor"
        }

    }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}