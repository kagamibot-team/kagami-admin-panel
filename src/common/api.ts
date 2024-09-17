import axios from "axios";

type APIWrapper<T> = {
    code: number,
    msg: string,
    data: T
}


async function _post<Ti, To>(path: string, data?: Ti) {
    return await axios.post(path, data).then(res => {
        const result: APIWrapper<To> = res.data;
        if (result.code != 0) {
            throw Error(
                `Error when fetching data Code=${result.code} Msg=${result.msg}`
            );
        }
        return result.data;
    });
}


async function _get<T>(path: string) {
    return await axios.get(path).then(res => {
        const result: APIWrapper<T> = res.data;
        if (result.code != 0) {
            throw Error(
                `Error when fetching data Code=${result.code} Msg=${result.msg}`
            );
        }
        return result.data;
    });
}


function get<T>(path: string) {
    return async () => await _get<T>(path);
}


function post<Ti, To>(path: string) {
    return async (data: Ti) => await _post<Ti, To>(path, data);
}


type BroadcastMessage = {
    message: string,
    is_admin: boolean,
};


const api = {
    ping: get<string>("/kagami-api/ping"),
    broadcast: post<BroadcastMessage, string>("/kagami-api/broadcast"),
};

export default api;
