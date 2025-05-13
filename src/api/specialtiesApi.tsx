import { API } from "./api";

export const specialtiesAPI = () => {
    return API.get(
        '/specialities', {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
        .then(res => res.data)
        .catch(err => { throw err })
}

export const postSpecialityAPI = (body:any) => {
    return API.post(
        '/specialities', body, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
        .then(res => res.data)
        .catch(err => { throw err })
}