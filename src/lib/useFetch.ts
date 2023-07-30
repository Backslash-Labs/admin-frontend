import { useState } from "react";

export let host = process.env.NODE_ENV === "production" ? "https://lofty-apex-386519.uc.r.appspot.com" : "http://localhost:8000";

const apiHost = `${host}/api`;

const useFetch = (path: string, onSuccess: (body: any, headers?: Headers) => void, onError?: (res?: any) => void) => {

    const [isFetching, setIsFetching] = useState(false);

    const onFetch = async (method = 'get', body = undefined) => {
        const token = localStorage.getItem("token");
        const _path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
        try {
            setIsFetching(true);
            console.log(`[${method}] ${path}`);
            const res = await fetch(`${apiHost}${_path}`, {
                method,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token},`
                },
                body: JSON.stringify(body)
            });
            console.log(`${path}: ${res.status}`);
            if (res.ok) {
                try {
                    const body = await res.json();
                    onSuccess(body, res.headers);
                }catch(e){
                    onSuccess({}, res.headers);
                }
            } else {
                if (onError) onError(res);
            }
        } catch (e) {
            console.log("here", e);
            if (onError) onError();
        } finally {
            setIsFetching(false)
        }
    }

    const onPost = async (body?: any) => onFetch("post", body)

    const onPut = async (body?: any) => onFetch("put", body)

    const onDelete = async (body?: any) => onFetch("delete", body)

    return {
        onFetch,
        isFetching,
        onPost,
        onPut,
        onDelete,
    }

}

export default useFetch;