import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Logo } from "../ui/logo";
import { NAVBAR_COLORS } from "@/theme";
import useRandomColor from "@/utils/use-random-color";

interface NavbarProps {
    sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ sticky }) => {
    const themeColors = useRandomColor();
    return (
        <div
            style={{
                backgroundColor: themeColors[1],
                // borderBottomWidth: 1,
                // borderBottomColor: themeColors[0],
            }}
            className={`${
                sticky && "sticky top-0 z-10"
            } py-2 flex items-center`}
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
                    {/* TODO – make this show a meny with profile, account settings and logout */}
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
