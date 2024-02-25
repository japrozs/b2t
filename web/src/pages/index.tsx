import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const [city, setCity] = useState("LON");
    const [numAdults, setNumAdults] = useState("1");
    const [numChildren, setNumChildren] = useState("1");
    const [checkinDate, setCheckinDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [checkoutDate, setCheckoutDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const router = useRouter();

    return (
        <div>
            <input
                className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="search country"
            />
            <input
                className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                value={numAdults}
                onChange={(e) => setNumAdults(e.target.value)}
                placeholder="num adults"
            />
            <input
                className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                value={numChildren}
                onChange={(e) => setNumChildren(e.target.value)}
                placeholder="num adults"
            />
            <input
                className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                value={checkinDate}
                type="date"
                onChange={(e) => setCheckinDate(e.target.value)}
                placeholder="check-in date"
            />
            <input
                className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                value={checkoutDate}
                type="date"
                onChange={(e) => setCheckoutDate(e.target.value)}
                placeholder="check-out date"
            />
            <button
                className="bg-purple-500 rounded-md py-2 px-3 text-white font-medium text-xs"
                onClick={() =>
                    router.push(
                        `search?city=${city}&in=${checkinDate}&out=${checkoutDate}&adults=${numAdults}&children=${numChildren}`
                    )
                }
            >
                Search
            </button>
        </div>
    );
}
