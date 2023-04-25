import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";

const Plans = () => {
    return (
        <>
            <LoadingTable
                path="/admin/plans"
                headers={[
                    "Name",
                    "Price",
                ]}
                title="Plans"
                addTitle="Add Plan"
            />
        </>
    )
}

export default withNav(Plans);