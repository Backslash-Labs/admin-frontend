import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const useShowBranch = () => {

    const {
        id
    } = useParams();

    const path = `/restaurants/${id}/branches`;

    const [restaurant, setRestaurant] = useState(null);

    const {
        onFetch,
        isFetching,
    } = useFetch(`/admin/restaurants/${id}`, setRestaurant)

    useEffect(() => {
        onFetch()
    }, [])

    return {
        restaurant,
        path,
        isFetching,
        id,
        setRestaurant,
    }
}

export default useShowBranch;