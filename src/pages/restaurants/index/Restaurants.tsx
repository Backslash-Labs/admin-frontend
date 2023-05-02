import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";

const Restaurants = () => {
  return (
    <>
      <LoadingTable
        path="/admin/companies"
        headers={[
          "Name",
          "Email",
          "Workspaces",
          "Users",
        ]}
        title="Restaurants"
        addTitle="Add Restaurant"
        editPath="/restaurants"
      />
    </>
  )
}

export default withNav(Restaurants);