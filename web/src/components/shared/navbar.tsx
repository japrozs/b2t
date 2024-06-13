import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Logo } from "../ui/logo";
import { NAVBAR_COLORS } from "@/theme";
import useRandomColor from "@/utils/use-random-color";
import { CgProfile } from "react-icons/cg";
import { BiLeftArrowAlt } from "react-icons/bi";
import { RiSuitcaseLine } from "react-icons/ri";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { TbLogout2 } from "react-icons/tb";
import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {
    sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ sticky }) => {
    const { data } = useMeQuery();
    const [logout] = useLogoutMutation();
    const router = useRouter();
    const client = useApolloClient();

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };
    return (
        <div
            className={`${
                sticky && "sticky top-0 z-10"
            } py-2 flex items-center bg-black`}
        >
            <div className="flex items-center w-full max-w-[76rem] mx-auto">
                <Link href="/app/">
                    <Logo className={`h-9 w-auto text-white`} />
                </Link>
                <div className="flex items-center ml-auto mr-0 space-x-5">
                    <Menu>
                        <MenuButton className="">
                            <IoMdMenu
                                className={`transition-all text-4xl cursor-pointer p-1 text-white`}
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
                                className={`w-64 origin-top-right rounded-xl bg-black border border-gray-800 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none`}
                            >
                                <div className="mt-1 mb-1.5 px-3 flex items-center">
                                    <div className="mr-0.5">
                                        <p className="text-md line-clamp-1 g-sans font-medium text-gray-100">
                                            {data?.me?.firstName}{" "}
                                            {data?.me?.lastName}
                                        </p>
                                        <p className="text-xs font-medium text-gray-500">
                                            Standard User
                                        </p>
                                    </div>
                                    <p className="min-w-7 ml-auto mr-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#00395D] text-[#00AEEF] font-medium text-md   g-sans">
                                        {data?.me?.firstName.charAt(0)}
                                    </p>
                                </div>
                                <div className="my-1 h-px bg-gray-800" />
                                <MenuItem>
                                    <a
                                        href="/app/bookings"
                                        className="group flex w-full items-center cursor-pointer gap-3 rounded-lg py-1.5 px-3 text-gray-200 data-[focus]:text-white data-[focus]:bg-white/10"
                                    >
                                        <RiSuitcaseLine className="text-lg text-gray-400" />
                                        My Bookings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 text-gray-200 data-[focus]:text-white data-[focus]:bg-white/10">
                                        <CgProfile className="text-lg text-gray-400" />
                                        Manage account
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-gray-800" />
                                <MenuItem>
                                    <button
                                        onClick={logUserOut}
                                        className="group flex w-full items-center gap-3 rounded-lg py-1.5 px-3 data-[focus]:bg-red-400/15 text-red-500"
                                    >
                                        <TbLogout2 className="text-lg " />
                                        Sign out
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
