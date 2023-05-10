import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";
import { useParams } from "react-router-dom";

const ShowRestaurants = () => {

    const {
        id
    } = useParams();

    const path = `/restaurants/${id}/branches`;

    return (
        <>
            <LoadingTable
                path={`/admin/companies/${id}/branches`}
                headers={[
                    "Location",
                ]}
                title="Branches"
                addTitle="Add Branch"
                editPath={`${path}`}
                createPath={`${path}/create`}
                canEdit={false}
            />
        </>
    )
}

export default withNav(ShowRestaurants);