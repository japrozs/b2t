import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";
import { RiSuitcaseLine } from "react-icons/ri";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = ({}) => {
    useIsAuth();
    return (
        <div>
            <Navbar />
            <div className="mt-5 mb-10 flex items-start max-w-[76rem] mx-auto space-x-10">
                <p className="text-2xl font-semibold mb-0 flex items-center">
                    <RiSuitcaseLine className="text-gray-300 mr-2" />
                    My bookings
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Bookings;
