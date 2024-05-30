import { NAVBAR_COLORS } from "@/theme";
import { useState, useEffect } from "react";

const useRandomColor = () => {
    const [randomColor, setRandomColor] = useState<string[]>([]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * NAVBAR_COLORS.length);
        setRandomColor(NAVBAR_COLORS[randomIndex]);
    }, []);

    return randomColor;
};

export default useRandomColor;
