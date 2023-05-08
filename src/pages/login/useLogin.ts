import { AppContext } from "contexts/AppContext";
import useFetch from "lib/useFetch";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

    const navigate = useNavigate();

    const {
        setCurrentUser
    } = useContext(AppContext);

    const {
        onPost,
        isFetching,
    } = useFetch("/sign_in", (body, headers) => {
        const auth = headers.get("Authorization");
        const token = auth.substring(7, auth.length);
        localStorage.setItem("token", token);
        setCurrentUser(body);
        navigate("/");
    })

    const onSubmit = (values) => onPost(values);

    return {
        onSubmit,
        isFetching,
    }
}

export default useLogin;