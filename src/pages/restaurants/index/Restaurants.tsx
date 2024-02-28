import LoadingTable from "components/table/LoadingTable";
import withNav from "hocs/withNav";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {

  const navigate = useNavigate();

  const onClick = (restaurant) => navigate(`/restaurants/${restaurant.id}`)

  return (
    <>
      <LoadingTable
        path="/admin/restaurants"
        headers={[
          "Name",
          "Email",
          "Subscription",
          {
            name: "Due",
            key: "next_payment_at",
          },
          {
            name: "Allowed Users",
            key: "allowed_users",
          },
          {
            name: "Allowed Branches",
            key: "allowed_branches",
          }
        ]}
        title="Restaurants"
        addTitle="Add Restaurant"
        editPath="/restaurants"
        showPath="/restaurants"
        onClick={onClick}
        canShow
      />
    </>
  )
}

export default withNav(Restaurants);