import React from "react";
import { options } from "sanitize-html";

interface SearchPillProps {
    label: string;
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    optionState: string;
    optionSetState: React.Dispatch<React.SetStateAction<string>>;
    options: {
        [key: string]: string;
    };
}

export const SearchPill: React.FC<SearchPillProps> = ({
    label,
    state,
    setState,
    options,
    optionState,
    optionSetState,
}) => {
    return (
        <div
            className={`transition-all cursor-pointer group border ${
                state
                    ? "border-purple-500 bg-purple-200"
                    : "border-gray-300 hover:border-gray-400"
            } bg-opacity-60 px-3 py-1 flex items-center rounded-full min-w-max`}
        >
            <p
                onClick={() => setState(!state)}
                className={`transition-all text-xs font-semibold ${
                    state
                        ? "text-purple-900"
                        : "text-gray-600 group-hover:text-gray-800"
                }`}
            >
                {label}
            </p>
            <select
                className={`transition-all bg-transparent text-xs font-semibold focus:outline-none ${
                    state
                        ? "text-purple-900"
                        : "text-gray-600 group-hover:text-gray-800"
                }`}
                value={optionState}
                onChange={(e) => {
                    setState(true);
                    optionSetState(e.target.value);
                }}
            >
                {Object.keys(options).map((key, idx) => (
                    <option key={idx} value={key}>
                        {options[key]}
                    </option>
                ))}
            </select>
        </div>
    );
};
