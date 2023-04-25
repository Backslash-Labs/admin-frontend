import useFetch from "lib/useFetch"
import Table, { TableProps } from "./table/Table"
import { FC, useEffect, useState } from "react"

export interface LoadingTableProps extends TableProps {
}

const LoadingTable: FC<LoadingTableProps> = ({path, ...others}) => {

    const [rows, setRows] = useState([]);

    const onSuccess = (body) => {
        setRows(body);
    }

    const {
        onFetch,
        isFetching
    } = useFetch(path, onSuccess)

    useEffect(() => {
        onFetch()
    }, [])

    if(isFetching) return <h1>Loading.....</h1>

    return(
        <Table
            path={path}
            rows={rows}
            {...others} 
        />
    )
}

export default LoadingTable;