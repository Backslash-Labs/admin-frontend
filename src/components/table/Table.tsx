import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TableContext } from "./TableContext";
import Row from "./Row";

export interface TableProps {
  headers: any[]
  rows?: any[]
  title: string
  canAdd?: boolean
  addTitle?: string
  path?: string
  canEdit?: boolean
  canDelete?: boolean
  editPath?: string
}

const Table: FC<TableProps> = (props) => {

  const {
    headers,
    rows: initRows,
    title,
    addTitle,
    canAdd = true,
    canEdit = true,
    canDelete = true,
  } = props;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(initRows);
  }, [initRows])

  const tableContext = {
    ...props,
    rows,
    setRows,
  }

  return (
    <>
      <TableContext.Provider value={tableContext}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
              {/*<p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
    */}
            </div>
            {
              canAdd ?
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <Link
                    type="button"
                    className="block rounded-md bg-green-850 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    to={`/${title.toLowerCase()}/create`}
                  >
                    {addTitle}
                  </Link>
                </div>
                : null
            }
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {
                          headers.map((header, i) => {
                            return (
                              <th key={i} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                {header}
                              </th>
                            )
                          })
                        }
                        {
                          canEdit ?
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Edit</span>
                            </th>
                            : null
                        }
                        {
                          canDelete ?
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Delete</span>
                            </th>
                            : null
                        }
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {
                        rows.map((row, i) =>
                          <Row
                            row={row}
                            key={i}
                            i={i}
                          />
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div >
      </TableContext.Provider>
    </>
  )
}


export default Table;