import LoadingTable from "components/table/LoadingTable";
import withNav from "hocs/withNav";

const Users = () => {
    return (
        <>
            <LoadingTable
                path="/admin/users"
                headers={[
                    "Name",
                    "Email",
                    "Role"
                ]}
                title="Users"
                canEdit={false}
                addTitle="Add User"
            />
        </>
    )
}

export default withNav(Users);