import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
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
        <HoverCard>
            <HoverCardTrigger>{button({ open: isShowing })}</HoverCardTrigger>
            <HoverCardContent>{panel({ open: isShowing })}</HoverCardContent>
        </HoverCard>
    );
};
