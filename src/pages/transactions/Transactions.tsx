import LoadingTable from "components/table/LoadingTable";
import withNav from "hocs/withNav";
import { useNavigate } from "react-router-dom";

const Transactions = () => {

  const navigate = useNavigate();

  const onClick = (transaction) => navigate(`/transactions/${transaction.id}`)

  return (
    <>
      <LoadingTable
        path="/admin/transactions"
        headers={[
          "Name",
          "Amount",
          {
            name: "Date",
            key: "created_at",
          },
        ]}
        title="Transactions"
        addTitle="Add Transaction"
        editPath="/transactions"
        showPath="/transactions"
        onClick={onClick}
        canAdd={false}
        canEdit={false}
        canDelete={false}
      />
    </>
  )
}

export default withNav(Transactions);