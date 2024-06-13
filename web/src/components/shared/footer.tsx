import React from "react";
import { Logo } from "../ui/logo";
import useRandomColor from "@/utils/use-random-color";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    const themeColor = useRandomColor();
    return (
        <div className="bg-black p-9 pb-0">
            <div className="max-w-[76rem] mx-auto flex items-start text-white">
                <div className="p-3 w-full">
                    <p className="text-xl font-medium mb-4">Our products</p>
                    <p className=" w-max text-gray-500 text-md font-medium mb-2.5 hover:text-gray-100 cursor-pointer">
                        For large companies
                    </p>
                    <p className=" w-max text-gray-500 text-md font-medium mb-2.5 hover:text-gray-100 cursor-pointer">
                        For hotels
                    </p>
                </div>
                <div className="p-3 w-full">
                    <p className="text-xl font-medium mb-4">Our services</p>
                    <p className=" w-max text-gray-500 text-md font-medium mb-2.5 hover:text-gray-100 cursor-pointer">
                        Contact
                    </p>
                    <p className=" w-max text-gray-500 text-md font-medium mb-2.5 hover:text-gray-100 cursor-pointer">
                        Jobs and careers
                    </p>
                    <p className=" w-max text-gray-500 text-md font-medium mb-2.5 hover:text-gray-100 cursor-pointer">
                        Press
                    </p>
                </div>
                <div className="p-3 w-full">
                    <Logo className={`h-8 w-auto text-white`} />
                </div>
            </div>
            <hr className="px-4 my-2.5 max-w-[76rem] mx-auto border-gray-900" />
            <div className="py-4 pb-6 flex items-center max-w-[76rem] mx-auto">
                <p className="text-gray-400 text-md font-medium">
                    {new Date().getFullYear()} Noble Travels. All rights
                    reserved
                </p>
                <div className="flex items-center ml-auto mr-0 space-x-7">
                    <p className="cursor-pointer transition-all text-gray-400 text-md font-medium hover:underline hover:text-gray-100">
                        Data collection & privacy
                    </p>
                    <p className="cursor-pointer transition-all text-gray-400 text-md font-medium hover:underline hover:text-gray-100">
                        Cookies
                    </p>
                    <p className="cursor-pointer transition-all text-gray-400 text-md font-medium hover:underline hover:text-gray-100">
                        Cookie settings
                    </p>
                    <p className="cursor-pointer transition-all text-gray-400 text-md font-medium hover:underline hover:text-gray-100">
                        T&C's
                    </p>
                    <p className="cursor-pointer transition-all text-gray-400 text-md font-medium hover:underline hover:text-gray-100">
                        Imprint
                    </p>
                </div>
            </div>
        </div>
    );
};
