import useFetch from "lib/useFetch";
import { useNavigate } from "react-router-dom";

const usePlanForm = () => {

    const navigate = useNavigate();

    const {
        onPost,
        isFetching,
    } = useFetch("/admin/plans", () => {
        navigate("/plans");
    })

    const onSubmit = (values) => onPost(values);

    return {
        onSubmit,
        isFetching,
    }
}

export default usePlanForm;