import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Logo } from "./logo";
import { NAVBAR_COLORS } from "@/theme";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [themeColors, setThemeColors] = useState<string[]>([]);
    useEffect(() => {
        const idx = Math.floor(Math.random() * NAVBAR_COLORS.length);
        setThemeColors(NAVBAR_COLORS[idx]);
    });
    return (
        <div
            style={{
                backgroundColor: themeColors[1],
            }}
            className={`px-4 py-2 flex items-center`}
        >
            <div className="flex items-center w-full max-w-[76rem] mx-auto">
                <Link href="/app/">
                    <Logo
                        style={{
                            color: themeColors[0],
                        }}
                        className={`h-9 w-auto`}
                    />
                </Link>
                <div className="flex items-center ml-auto mr-0">
                    <IoMdMenu
                        style={{
                            color: themeColors[0],
                        }}
                        className={`transition-all text-4xl cursor-pointer p-1`}
                    />
                </div>
            </div>
        </div>
    );
};
