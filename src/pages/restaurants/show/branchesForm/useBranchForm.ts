import useFetch from "lib/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const useBranchForm = () => {

    const navigate = useNavigate();

    const {
        restaurant_id,
    } = useParams();

    const {
        onPost,
        isFetching,
    } = useFetch(`/admin/companies/${restaurant_id}/branches`, () => {
        navigate(`/restaurants/${restaurant_id}`);
    })

    const onSubmit = (values) => onPost(values);

    return {
        onSubmit,
        isFetching,
    }
}

export default useBranchForm;