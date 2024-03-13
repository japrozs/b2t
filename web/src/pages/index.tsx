import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RoomCfgType } from "@/types";

export default function Home() {
    return (
        <>
            <a href="/login" className="menlo text-red-500 hover:underline">
                login
            </a>
            <br />
            <a href="/signup" className="menlo text-red-500 hover:underline">
                signup
            </a>
        </>
    );
}
