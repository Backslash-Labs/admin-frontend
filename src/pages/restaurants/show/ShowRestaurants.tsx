import LoadingTable from "components/table/LoadingTable";
import withNav from "hocs/withNav";
import useShowBranch from "./useShowBranch";
import ActivityIndicator from "base/ActivityIndicator";
import PrimaryButton from "base/PrimaryButton";
import useFetch from "lib/useFetch";

const ShowRestaurants = () => {
  const { isFetching, path, restaurant, id, setRestaurant } = useShowBranch();


  const {
    onPut,
    isFetching: isUpdating
  } = useFetch(`/admin/restaurants/${id}/update_subscription`, (body) => {
    setRestaurant({ ...body })
  })


  if (isFetching || restaurant == null)
    return <ActivityIndicator color="fill-green-850" />;

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto space-y-6">
            <div>
              <h1 className="text-2xl">{restaurant.name}</h1>
              <p>{restaurant.email}</p>
            </div>
            <div className="mt-2">
              <p className="font-bold">Subscription Type</p>
              <p>{restaurant.subscription}</p>
            </div>
            <div className="mt-2">
              <p className="font-bold">Due</p>
              <p>{restaurant.next_payment_at}</p>
            </div>
            <div className="mt-2">
              <PrimaryButton onClick={() => onPut()} isLoading={isUpdating}>
                Update Subscription
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <LoadingTable
        path={`/admin/restaurants/${id}/branches`}
        headers={["Name", "Location"]}
        title="Branches"
        addTitle="Add Branch"
        createPath={`${path}/create`}
        canEdit={false}
      />
      <div className="mt-4">
        <LoadingTable
          path={`/admin/restaurants/${id}/branch_users`}
          headers={["Name", "Email"]}
          title="Users"
          addTitle="Add User"
          createPath={`/restaurants/${id}/branch_users/create`}
          canEdit={false}
          canDelete={false}
        />
      </div>
    </>
  );
};

export default withNav(ShowRestaurants);
