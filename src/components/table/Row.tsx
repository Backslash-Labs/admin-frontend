import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import useFetch from "lib/useFetch";

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

    return (
        <tr>
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
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                </a>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button onClick={handleDelete} className="text-indigo-600 hover:text-indigo-900">
                    Delete
                </button>
            </td>
        </tr>
    )
}


export default Row;