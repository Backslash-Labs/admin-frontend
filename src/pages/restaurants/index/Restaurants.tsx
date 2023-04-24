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
        ]}
        title="Restaurants"
        addTitle="Add Restaurant"
      />
    </>
  )
}

export default withNav(Restaurants);