import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import React, { useState } from "react";

interface PopperFunctionPropsType {
    open: boolean;
}
interface PopperProps {
    button: (props: PopperFunctionPropsType) => React.JSX.Element;
    panel: (props: PopperFunctionPropsType) => React.JSX.Element;
    panelShadow?: boolean;
}

export const Popper: React.FC<PopperProps> = ({
    button,
    panel,
    panelShadow,
}) => {
    const [isShowing, setIsShowing] = useState(false);
    return (
        // TODO: figure out a way to make the text in the box readable
        <Popover className="">
            <PopoverButton
                onMouseEnter={() => setIsShowing(true)}
                onMouseLeave={() => setIsShowing(false)}
            >
                {button({ open: isShowing })}
            </PopoverButton>
            <Transition
                show={isShowing}
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-200 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <PopoverPanel
                    onMouseEnter={() => setIsShowing(true)}
                    onMouseLeave={() => setIsShowing(false)}
                    anchor="top"
                    className={`transition ${
                        panelShadow && "shadow-lg"
                    }  rounded-lg border border-gray-300 mb-2`}
                >
                    {panel({ open: isShowing })}
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};
