import React from "react";
import { IconType } from "react-icons";

type PillProps = {
    label: string;
    icon?: IconType;
    colored?: boolean;
    bgAndBorderColor?: string;
    textColor?: string;
    className?: string;
} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const Pill: React.FC<PillProps> = ({
    label,
    icon: Icon,
    colored,
    bgAndBorderColor,
    textColor,
    className,
    ...props
}) => {
    return (
        <div
            className={`transition-all border ${
                colored
                    ? bgAndBorderColor
                        ? bgAndBorderColor
                        : "border-blue-500 bg-blue-200"
                    : "border-gray-300"
            } bg-opacity-60 px-2 py-1 flex items-center rounded-full min-w-max ${className}`}
            {...props}
        >
            <p
                className={`text-xs font-semibold ${
                    colored
                        ? textColor
                            ? textColor
                            : "text-blue-main"
                        : "text-gray-900"
                }`}
            >
                {label}
            </p>
        </div>
    );
};
