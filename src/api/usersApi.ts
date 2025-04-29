import { API } from "./api";

export const usersAPI = (id?:string) => {
    return API.get(
        '/users', {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        params:{
            ...id && {id}
        }

    }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}