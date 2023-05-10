import LoadingTable from "components/LoadingTable";
import withNav from "hocs/withNav";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {

  const navigate = useNavigate();

  const onClick = (restaurant) => navigate(`/restaurants/${restaurant.id}`)

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
        onClick={onClick}
      />
    </>
  )
}

export default withNav(Restaurants);