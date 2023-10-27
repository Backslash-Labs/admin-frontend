import { AppContext } from "contexts/AppContext";
import useFetch from "lib/useFetch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

    const navigate = useNavigate();

    const {
        setCurrentUser
    } = useContext(AppContext);

    const [asyncErrors, setAsyncErrors] = useState({
        email: []
    })

    const {
        onPost,
        isFetching,
    } = useFetch("/sign_in", (body, headers) => {
        const auth = headers.get("Authorization");
        const token = auth.substring(7, auth.length);
        localStorage.setItem("token", token);
        setCurrentUser(body);
        navigate("/");
    }, async (res: Response) => {
        if(res.status == 422){
            const body = await res.json();
            setAsyncErrors(body.errors);
        }
    })

    const onSubmit = (values) => onPost(values);

    return {
        onSubmit,
        isFetching,
        asyncErrors,
    }
}

export default useLogin;