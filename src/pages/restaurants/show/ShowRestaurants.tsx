import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";
import useFetch from "lib/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowRestaurants = () => {

    const {
        id
    } = useParams();

    const path = `/restaurants/${id}/branches`;

    const [restaurant, setRestaurant] = useState({});

    const {
        onFetch,
        isFetching,
    } = useFetch(`/admin/companies/${id}`, setRestaurant)

    useEffect(() => {
        onFetch()
    }, [])


    if (isFetching) return null;

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 mb-10">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">

                        <h1>
                            {restaurant.name}
                        </h1>
                        <p>{restaurant.email}</p>

                    </div>
                </div>
            </div>
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