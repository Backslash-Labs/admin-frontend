import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";
import useShowBranch from "./useShowBranch";

const ShowRestaurants = () => {

    const {
        isFetching,
        path,
        restaurant,
        id,
    } = useShowBranch();


    if (isFetching) return null;

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 mb-10">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">

                        <h1>
                            {restaurant.name}
                        </h1>
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
                createPath={`${path}/create`}
                canEdit={false}
            />
            <div className="mt-4">
                <LoadingTable
                    path={`/admin/companies/${id}/workers`}
                    headers={[
                        "Name",
                        "Email"
                    ]}
                    title="Workers"
                    addTitle="Add Worker"
                    createPath={`/restaurants/${id}/workers/create`}
                    canEdit={false}
                    canDelete={false}
                />
            </div>
        </>
    )
}

export default withNav(ShowRestaurants);