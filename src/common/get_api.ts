import axios from "axios";

type APIWrapper<T> = {
    code: number,
    msg: string,
    data: T
}


async function _post<T>(path: string, data?: any) {
    return await axios.post(path, data).then(res => {
        const result: APIWrapper<T> = res.data;
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


const api = {
    ping: async () => _get<string>("/kagami-api/ping")
};

export default api;
