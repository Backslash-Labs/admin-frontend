import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useWorkerForm = () => {

    const navigate = useNavigate();

    const {
        restaurant_id,
    } = useParams();

    const {
        onPost,
        isFetching,
    } = useFetch(`/admin/companies/${restaurant_id}/workers`, () => {
        navigate(`/restaurants/${restaurant_id}`);
    })

    const onSubmit = (values) => onPost(values);


    const [branches, setBranches] = useState([]);

    const [selectedBranches, setSelectedBranches] = useState([]);

    const {
        onFetch,
    } = useFetch(`/admin/companies/${restaurant_id}/branches`, (body) => {
        setBranches(body)
    })

    useEffect(() => {
        onFetch();
    }, [])

    return {
        onSubmit,
        isFetching,
        branches,
        selectedBranches,
        setSelectedBranches,
    }
}

export default useWorkerForm;