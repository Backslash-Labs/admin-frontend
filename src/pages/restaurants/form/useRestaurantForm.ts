import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useRestaurantForm = () => {

    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);

    const [isEditing, setIsEditing] = useState(false);

    const [restaurant, setRestaurant] = useState({
        name: "",
        email: "",
        users: 0,
        workspaces: 0,
        plan_id: null,
    });

    const {
        onFetch,
        isFetching: isFetchingPlans,
    } = useFetch("/admin/plans", setPlans);


    const {
        id,
    } = useParams();

    const {
        onFetch: onFetchRestaurant,
        isFetching: isFetchingRestaurant,
    } = useFetch(`/admin/companies/${id}`, (body) => {
        setRestaurant({ ...body })
    });

    useEffect(() => {
        onFetch();
        if(window.location.pathname.includes("edit")){
            setIsEditing(true);
        }
    }, [])


    useEffect(() => {
        onFetchRestaurant();
    }, [isEditing])

    const {
        onPost,
        isFetching,
    } = useFetch("/admin/companies", () => {
        navigate("/");
    })

    const onSubmit = (values) => onPost(values);

    return {
        plans,
        onSubmit,
        isFetching,
        isFetchingPlans,
        isEditing,
        restaurant,
        isFetchingRestaurant,
    }
}

export default useRestaurantForm;