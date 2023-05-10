import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";
import { useParams } from "react-router-dom";

const ShowRestaurants = () => {

    const {
        id
    } = useParams();

    return (
        <>
            <LoadingTable
                path={`/admin/companies/${id}/branches`}
                headers={[
                    "Location",
                ]}
                title="Branches"
                addTitle="Add Branch"
                editPath={`/restaurants/${id}/branches`}
            />
        </>
    )
}

export default withNav(ShowRestaurants);