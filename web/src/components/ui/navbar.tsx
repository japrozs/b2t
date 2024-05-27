import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdMenu } from "react-icons/io";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <div className="bg-primary-color px-4 py-2.5 flex items-center">
            <Link href="/app/">
                <Image
                    src="/logo.svg"
                    className="h-8 w-auto"
                    height={20}
                    width={20}
                    alt="logo"
                    fetchPriority="auto"
                />
            </Link>
            <div className="flex items-center ml-auto mr-0">
                <IoMdMenu className="transition-all text-3xl cursor-pointer hover:bg-opacity-15 hover:bg-blue-500 rounded-full p-1" />
            </div>
        </div>
    );
};
