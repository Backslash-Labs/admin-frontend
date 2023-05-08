import { createContext } from "react";
import { TableProps } from "./Table";


export interface ITableContext extends TableProps {
    setRows: (row: any) => void
}


export const TableContext = createContext<ITableContext>(null);