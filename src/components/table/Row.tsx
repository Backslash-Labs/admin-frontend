import { FC, useContext } from "react";
import { TableContext } from "./TableContext";
import useFetch from "lib/useFetch";
import { Link } from "react-router-dom";
import { ModalContext } from "components/modal/ModalContext";
import ConfirmModal from "components/modal/ConfirmModal";
import useModal from "components/modal/useModal";

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
        title,
        canShow = false,
        showPath,
    } = useContext(TableContext);

    const {
        onDelete
    } = useFetch(`${path}/${row.id}`, () => {
        rows.splice(i, 1);
        setRows([...rows]);
    });

    const deleteModalHook = useModal();

    const onConfirmDelete = () => {
        onDelete();
    }

    const handleDelete = (event: Event) => {
        event.stopPropagation();
        deleteModalHook.onOpen();
    }

    return (
        <tr>
            {
                headers.map((header, j) => {

                    if (typeof header === "object") return (
                        <td key={j} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {
                                row[header.key.toLowerCase()]
                            }
                        </td>
                    )

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
                canShow ?
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`${showPath}/${row.id}`} className="text-green-600 hover:text-green-900">
                            Show
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
            {
                canDelete ?
                    <ModalContext.Provider
                        value={deleteModalHook}
                    >
                        <ConfirmModal
                            onConfirm={onConfirmDelete}
                            title={`Delete ${title}`}
                            text="Are you sure you want to delete this? All of your data will be permanently removed
                                from our servers forever. This action cannot be undone."
                        />
                    </ModalContext.Provider>
                    : null
            }
        </tr>
    )
}


export default Row;