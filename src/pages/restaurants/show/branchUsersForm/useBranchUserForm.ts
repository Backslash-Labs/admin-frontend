import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useBranchUserForm = () => {

    const navigate = useNavigate();

    const {
        restaurant_id,
    } = useParams();

    const {
        onPost,
        isFetching,
    } = useFetch(`/admin/restaurants/${restaurant_id}/branch_users`, () => {
        navigate(`/restaurants/${restaurant_id}`);
    })

    const onSubmit = (values) => onPost(values);


    const [branches, setBranches] = useState([]);

    const [selectedBranches, setSelectedBranches] = useState([]);

    const {
        onFetch,
    } = useFetch(`/admin/restaurants/${restaurant_id}/branches`, (body) => {
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

export default useBranchUserForm;