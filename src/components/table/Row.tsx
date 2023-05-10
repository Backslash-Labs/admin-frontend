import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import useFetch from "lib/useFetch";
import { Link } from "react-router-dom";

export interface RowProps {
    row: any
    i: number
}

const Row: FC<RowProps> = ({ row, i }) => {

    const {
        headers,
        path,
        rows,
        setRows,
        canEdit = true,
        canDelete = true,
        editPath,
        onClick,
    } = useContext(TableContext);

    const {
        onDelete
    } = useFetch(`${path}/${row.id}`, () => {
        rows.splice(i, 1);
        setRows([...rows]);
    });

    const handleDelete = () => {
        onDelete();
    }

    const handleClick = () => {
        onClick(row);
    }

    return (
        <tr onClick={handleClick}>
            {
                headers.map((header, j) => {
                    return (
                        <td key={j} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {
                                row[header.toLowerCase()]
                            }
                        </td>
                    )
                })
            }
            {
                canEdit ?
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`${editPath}/${row.id}/edit`} className="text-green-600 hover:text-green-900">
                            Edit
                        </Link>
                    </td>
                    : null
            }
            {
                canDelete ?
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={handleDelete} className="text-green-600 hover:text-green-900">
                            Delete
                        </button>
                    </td>
                    : null
            }
        </tr>
    )
}


export default Row;