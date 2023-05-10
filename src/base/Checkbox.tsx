import { FC, InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    formik?: any
    helperText?: string
}

const Checkbox: FC<CheckboxProps> = ({
    label = "",
    id,
    name,
    value,
    formik,
    onChange,
    helperText,
    ...others
}) => {

    let inputId = id || label.toLowerCase();

    const inputName = name || label.toLowerCase();
    
    let inputValue = value 
    
    if(!inputValue && formik){
        inputValue = formik.values[inputName]
    }

    let handleChange = onChange
    
    if(!handleChange && formik){
        handleChange = formik.handleChange
    }

    const _helperText = helperText || formik ? formik.errors[inputName] : undefined;

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
                    <p className="text-gray-500">{_helperText}</p>
                </div>
            </div>
        </>
    )
}

export default Checkbox;