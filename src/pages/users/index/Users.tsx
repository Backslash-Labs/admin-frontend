import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";

const Users = () => {
    return (
        <>
            <LoadingTable
                path="/admin/users"
                headers={[
                    "Name",
                    "Price",
                ]}
                title="Users"
            />
        </>
    )
}

export default withNav(Users);