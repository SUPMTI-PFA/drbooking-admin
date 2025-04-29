import { API } from "./api";

export const doctorsAPI = (id?:string) => {
    return API.get(
        '/users', {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        params:{
            "accountType": "doctor",
            ...id && {id}
        }

    }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}