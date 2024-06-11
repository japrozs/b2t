import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Logo } from "../ui/logo";
import { NAVBAR_COLORS } from "@/theme";
import useRandomColor from "@/utils/use-random-color";
import { BiLeftArrowAlt } from "react-icons/bi";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";

interface NavbarProps {
    sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ sticky }) => {
    const themeColors = useRandomColor();
    return (
        <div
            style={{
                backgroundColor: themeColors[1],
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
                <div className="flex items-center ml-auto mr-0 space-x-5">
                    {/* TODO – make this show a meny with profile, account settings and logout */}
                    <Menu>
                        <MenuButton className="">
                            <IoMdMenu
                                style={{
                                    color: themeColors[0],
                                }}
                                className={`transition-all text-4xl cursor-pointer p-1`}
                            />
                        </MenuButton>
                        <Transition
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <MenuItems
                                anchor="bottom end"
                                className={`w-52 origin-top-right rounded-xl bg-[${themeColors[1]}] p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none`}
                            >
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        Edit
                                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                            ⌘E
                                        </kbd>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        Duplicate
                                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                            ⌘D
                                        </kbd>
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-white/5" />
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        Archive
                                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                            ⌘A
                                        </kbd>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        Delete
                                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                            ⌘D
                                        </kbd>
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
};
