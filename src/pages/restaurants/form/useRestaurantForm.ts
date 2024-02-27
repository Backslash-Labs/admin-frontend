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
        allowed_users: 0,
        allowed_branches: 0,
        plan_id: null,
        features: [],
        subscription: "Monthly",
        upfront: false,
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
    } = useFetch(`/admin/restaurants/${id}`, (body) => {
        setRestaurant({ ...body })
    });

    useEffect(() => {
        onFetch();
        if(window.location.pathname.includes("edit")){
            setIsEditing(true);
        }
    }, [])


    useEffect(() => {
        if(isEditing) onFetchRestaurant();
    }, [isEditing])

    const {
        onPost,
        isFetching,
    } = useFetch("/admin/restaurants", () => {
        navigate("/");
    })

    const {
        onPut,
        isFetching: isUpdating,
    } = useFetch(`/admin/restaurants/${id}`, () => {
        navigate(-1);
    })


    const onSubmit = (values) => {
        isEditing ? onPut(values) : onPost(values);
    }

    return {
        plans,
        onSubmit,
        isFetching: isFetching || isUpdating,
        isFetchingPlans,
        isEditing,
        restaurant,
        isFetchingRestaurant,
    }
}

export default useRestaurantForm;