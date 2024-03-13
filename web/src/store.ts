import { create } from "zustand";
import { RegularHotelFragment } from "./generated/graphql";
import { HotelSearchItemType } from "./types";

export interface StoreState {
    hotel: HotelSearchItemType | {};
    roomId: number;
    setHotel: (hotel: HotelSearchItemType) => void;
    setRoomID: (id: number) => void;
}

export const useCheckoutStore = create<StoreState>()((set) => ({
    hotel: {},
    roomId: -1,
    setHotel: (hotel: HotelSearchItemType) =>
        set({
            hotel,
        }),
    setRoomID: (id: number) =>
        set({
            roomId: id,
        }),
}));
