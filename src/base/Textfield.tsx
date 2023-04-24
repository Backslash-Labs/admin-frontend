import { FC, InputHTMLAttributes } from "react";

export interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    formik?: any
    helperText?: string
}

const Textfield: FC<TextfieldProps> = ({
    label,
    id,
    name,
    type,
    value,
    formik,
    onChange,
    helperText,
}) => {

    let inputId = id || label.toLowerCase();

    const inputName = name || label.toLowerCase();

    const inputValue = value || formik ? formik.values[inputName] : undefined;

    const handleChange = onChange || formik ? formik.handleChange : undefined;

    const _helperText = helperText || formik ? formik.errors[inputName] : undefined;

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
                <input
                    type={type}
                    name={inputName}
                    id={inputId}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputValue}
                    onChange={handleChange}
                />
            </div>
            <p>{_helperText}</p>
        </div>
    )
}

export default Textfield;