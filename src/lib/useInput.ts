import { InputHTMLAttributes } from "react";

export interface IUseInput extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>  {
    label?: string
    formik?: any
    helperText?: string
}

const useInput = (options: IUseInput) => {

    const {
        label = "",
        id,
        name,
        value,
        formik,
        onChange,
        helperText,
    } = options;

    let inputId = id || label.toLowerCase();

    const inputName = name || label.toLowerCase();

    let inputValue = value

    if (!inputValue && formik) inputValue = formik.values[inputName]

    let handleChange = onChange

    if (!handleChange && formik) handleChange = formik.handleChange

    const inputHelperText = helperText || formik ? formik.errors[inputName] : undefined;

    return {
        inputId,
        inputName,
        inputValue,
        handleChange,
        inputHelperText,
    }
}

export default useInput;