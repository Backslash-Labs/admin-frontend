import { useState } from "react";

const useFetch = (path: string, onSuccess: (body: any, headers?: Headers) => void, onError?: (res?: any) => void) => {


    const [isFetching, setIsFetching] = useState(false);

    const onFetch = async (method = 'get', body = undefined) => {

        let host = import.meta.env.VITE_API_HOST;        
    
        const apiHost = `${host}/api`;

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
            console.log(e);
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