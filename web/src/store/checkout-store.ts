import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "../types";

export type StoreState = {
    hotel: HotelSearchItemType | {};
    room: RoomDetailType | {};
    cfg: RoomCfgType | {};
};

export interface StoreActions {
    setHotel: (hotel: HotelSearchItemType) => void;
    setRoom: (r: RoomDetailType) => void;
    setCfg: (c: RoomCfgType) => void;
}

export type CheckoutStore = StoreState & StoreActions;

export const initCheckoutStore = (): StoreState => {
    return { hotel: {}, room: {}, cfg: { rooms: [] } };
};

export const defaultInitState: StoreState = {
    hotel: {},
    room: {},
    cfg: {},
};

export const createCheckoutStore = (
    initState: StoreState = defaultInitState
) => {
    return createStore<CheckoutStore>()(
        persist(
            (set) => ({
                ...initState,
                setHotel: (hotel: HotelSearchItemType) =>
                    set({
                        hotel,
                    }),
                setRoom: (r: RoomDetailType) =>
                    set({
                        room: r,
                    }),
                setCfg: (c: RoomCfgType) =>
                    set({
                        cfg: c,
                    }),
            }),
            {
                name: "checkout-store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    );
};
