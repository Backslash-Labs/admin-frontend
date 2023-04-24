import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useRestaurantForm = () => {

    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);

    const {
        onFetch,
        isFetching: isFetchingPlans,
    } = useFetch("/admin/plans", setPlans);

    useEffect(() => {
        onFetch();
    }, [])

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
    }
}

export default useRestaurantForm;