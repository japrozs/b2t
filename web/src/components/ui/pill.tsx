import React from "react";
import { IconType } from "react-icons";

interface PillProps {
    label: string;
    icon?: IconType;
}

export const Pill: React.FC<PillProps> = ({ label, icon: Icon }) => {
    return (
        <div
            className={`border border-blue-500 bg-blue-200 bg-opacity-60 px-2 py-1 flex items-center rounded min-w-max`}
        >
            {/* {Icon && (
                <Icon
                    className={`transition-all ${
                        label.length != 0 && "mr-1"
                    } text-xs ${
                        textColor ? `${textColor} opacity-60` : "text-gray-300"
                    }`}
                />
            )} */}
            <p className={`text-xs font-semibold text-blue-main`}>{label}</p>
        </div>
    );
};
