import useInput, { IUseInput } from "lib/useInput";
import { FC } from "react";

export interface TextfieldProps extends IUseInput {}

const Textfield: FC<TextfieldProps> = (props) => {
  const { label, type } = props;

  const { inputName, inputId, inputValue, handleChange, inputHelperText } =
    useInput(props);

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      ) : null}
      <div className="mt-2">
        <input
          type={type}
          name={inputName}
          id={inputId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-[15px]"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <p
        className="text-[#DC143C] capitalize text-[12px] mt-[5px] bg-[#FFF0F0]
"
      >
        {inputHelperText}
      </p>
    </div>
  );
};

export default Textfield;
