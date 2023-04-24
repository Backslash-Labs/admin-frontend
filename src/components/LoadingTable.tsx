import useFetch from "lib/useFetch"
import Table, { TableProps } from "./Table"
import { FC, useEffect, useState } from "react"

export interface LoadingTableProps extends TableProps {
    path: string
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
            rows={rows}
            {...others} 
        />
    )
}

export default LoadingTable;