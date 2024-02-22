import PrimaryButton from "base/PrimaryButton";
import LoadingTable from "components/table/LoadingTable";
import withNav from "hocs/withNav";
import useFetch from "lib/useFetch";
import { useNavigate } from "react-router-dom";

let Component = ({ row, setRows, index, rows, }) => {

    const {
        onPut,
        isFetching,
    } = useFetch(`/admin/branches/${row.branch_id}/settle`, () => {
        rows[index].amount = 0;
        setRows([...rows])
    })

    const onSubmit = () => {
        onPut({ })
    }

    return (
        <PrimaryButton 
            isLoading={isFetching} 
            onClick={onSubmit}
        >
            Settle
        </PrimaryButton>
    )
}

const Transactions = () => {

    return (
        <>
            <LoadingTable
                path="/admin/transactions"
                headers={[
                    "Name",
                    {
                        name: "Total Rev",
                        key: "total",
                    },
                    "Amount",
                    {
                        name: "Date",
                        key: "created_at",
                    },
                    {
                        name: "",
                        Component,
                    }
                ]}
                title="Transactions"
                addTitle="Add Transaction"
                editPath="/transactions"
                showPath="/transactions"
                canAdd={false}
                canEdit={false}
                canDelete={false}
            />
        </>
    )
}

export default withNav(Transactions);