import React from "react";

let host = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') host = "http://localhost:8000";

const apiHost = `${host}/api`;

const useFetch = (path: string, onSuccess: (body: any, headers?: Headers) => void) => {

    const [isFetching, setIsFetching] = React.useState(false);

    const onFetch = async (method = 'get', body = undefined) => {
        const token = localStorage.getItem("token");
        const _path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
        try {
            setIsFetching(true);
            const res = await fetch(`${apiHost}${_path}`, {
                method,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token},`
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const body = await res.json();
                onSuccess(body, res.headers);
            }
        } catch (e) {
            console.log(e);
            
        }finally{
            setIsFetching(false)
        }
    }

    const onPost = async (body?: any) => onFetch("post", body)

    const onPut = async (body?: any) => onFetch("put", body)

    return {
        onFetch,
        isFetching,
        onPost,
        onPut,
    }

}

export default useFetch;