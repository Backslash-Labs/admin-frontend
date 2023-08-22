import useInput, { IUseInput } from "lib/useInput";
import { FC } from "react";

export interface CheckboxProps extends IUseInput {

}

const Checkbox: FC<CheckboxProps> = (props) => {

    const {
        label = "",
        id,
        name,
        value,
        formik,
        onChange,
        helperText,
        ...others
    } = props


    const {
        inputName,
        inputId,
        inputValue,
        handleChange,
        inputHelperText,
    } = useInput(props);

    return (
        <>
            <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                    <input
                        name={inputName}
                        id={inputId}
                        value={inputValue}
                        onChange={handleChange}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        {...others}
                    />
                </div>
                <div className="text-sm leading-6">
                    {
                        label ?
                            <label htmlFor={id} className="font-medium text-gray-900">
                                {label}
                            </label>
                            : null
                    }
                    <p className="text-gray-500">{inputHelperText}</p>
                </div>
            </div>
        </>
    )
}

export default Checkbox;