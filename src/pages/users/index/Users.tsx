import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";

const Users = () => {
    return (
        <>
            <LoadingTable
                path="/admin/users"
                headers={[
                    "Name",
                    "Email",
                ]}
                title="Users"
                canEdit={false}
                canAdd={false}
            />
        </>
    )
}

export default withNav(Users);