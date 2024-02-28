import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useUserForm = () => {

    const navigate = useNavigate();

    const [asyncErrors, setAsyncErrors] = useState({
        name: [],
        email: [],
        password: []
    })

    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {
        id,
    } = useParams();

    const {
        onFetch: onFetchUser,
        isFetching: isFetchingUser,
    } = useFetch(`/admin/users/${id}`, (body) => {
        setUser({ ...body })
    });

    useEffect(() => {
        if(window.location.pathname.includes("edit")){
            setIsEditing(true);
        }
    }, [])


    useEffect(() => {
        if(isEditing) onFetchUser();
    }, [isEditing])

    const handleError = async (res: Response) => {
        console.log(res);
        
        if(res.status == 422){
            const body = await res.json();
            setAsyncErrors(body.errors);
        }
    }

    const {
        onPost,
        isFetching,
    } = useFetch("/admin/users", () => {
        navigate("/users");
    }, handleError)

    const {
        onPut,
        isFetching: isUpdating,
    } = useFetch(`/admin/users/${id}`, () => {
        navigate("/users");
    }, handleError)

    const onSubmit = (values) => {
        isEditing ? onPut(values) : onPost(values);
    }

    return {
        onSubmit,
        isFetching: isFetching || isUpdating,
        isEditing,
        user,
        isFetchingUser,
        asyncErrors,
    }
}

export default useUserForm;