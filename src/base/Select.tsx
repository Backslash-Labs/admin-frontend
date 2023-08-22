import useInput, { IUseInput } from "lib/useInput";
import { FC } from "react";

export interface SelectProps extends IUseInput {
    options: any[]
}

const Select: FC<SelectProps> = (props) => {

    const {
        label,
        options,
    } = props

    const {
        inputName,
        inputId,
        inputValue,
        handleChange,
        inputHelperText,
    } = useInput(props);

    return (
        <div className="">
            {
                label ?
                    <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                    : null
            }
            <div className="mt-2">
                <select
                    id={inputId}
                    name={inputName}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChange}
                    value={inputValue}
                >
                    <option value="">Select {label}</option>
                    {
                        options.map((opt, i) =>
                            <option key={i} value={opt.value}>{opt.name}</option>
                        )
                    }
                </select>
            </div>
            <p>{inputHelperText}</p>
        </div>
    )
}

export default Select;