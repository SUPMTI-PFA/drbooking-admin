import { API } from "./api";

export const usersAPI = (id?: string) => {
    return API.get(
        '/users', {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        params: {
            ...id && { id }
        }

    }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}

export const updateUserAPI = (id: string, formData: any) => {
    return API.put(
        '/users/id', formData,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }

        }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}

export const postUserAPI = (formData: any) => {
    return API.post(
        '/users', formData,
        {
            headers: {
                "Content-Type":"multipart/form-data",
                Accept: "application/json"
            }

        }
    )
        .then(res => res.data)
        .catch(err => { throw err })
}
