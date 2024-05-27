import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface DropDownProps {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    maxWidth?: boolean;
    hoverText?: string;
    options: {
        [key: string]: string;
    };
}

export const DropDown: React.FC<DropDownProps> = ({
    state,
    setState,
    hoverText,
    label,
    maxWidth,
    options,
    ...props
}) => {
    return (
        <div
            className={`${
                maxWidth ? "w-max" : "w-full"
            } text-dark-compliment flex flex-col items-center`}
        >
            <label
                htmlFor="cars"
                className={`w-full flex items-center text-sm ml-1.5 text-gray-800 mr-2`}
            >
                {/* {label} */}
                {hoverText && hoverText.trim().length !== 0 && (
                    <div className="has-tooltip">
                        <span className="transition-all tooltip rounded shadow-lg p-1.5 border border-gray-300 bg-gray-100 text-dark-compliment -mt-8">
                            {hoverText}
                        </span>
                        <AiOutlineQuestionCircle className="transition-all text-lg ml-2 cursor-pointer hover:text-blue-500" />
                    </div>
                )}
            </label>
            {/* {error && (
                <span
                    className={
                        "ml-0 mb-1 mr-auto code text-sm text-red-500 truncate"
                    }
                >
                    {error}
                </span>
            )} */}
            <select
                className={`w-full ml-auto mr-0 text-sm transition-all cursor-pointer outline-none text-gray-500 font-medium bg-white py-1.5 px-2 border rounded-md hover:bg-gray-50`}
                name="sort_by"
                id="sort_by"
                value={state}
                onChange={(e) => {
                    setState(e.target.value);
                }}
            >
                {/* <option selected={true} disabled={true}>
                    Choose Airline
                </option> */}
                {Object.keys(options).map((key, idx) => (
                    <option key={idx} value={key}>
                        {options[key]}
                    </option>
                ))}
            </select>
        </div>
    );
};
