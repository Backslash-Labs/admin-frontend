import { createContext } from "react";

export interface IResturantFormContext {
    plans: any[]
    selectedFeatures: number[]
    setSelectedFeatures: React.Dispatch<React.SetStateAction<any[]>>
    isFetching: boolean
}

export const ResturantFormContext = createContext<IResturantFormContext>(null);
