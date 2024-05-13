import { createStore } from "zustand/vanilla";
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
    return createStore<CheckoutStore>()((set) => ({
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
    }));
};

// export const useCheckoutStore = create<StoreState>()((set) => ({
//     hotel: {},
//     room: {},
//     cfg: {},
//     setHotel: (hotel: HotelSearchItemType) =>
//         set({
//             hotel,
//         }),
//     setRoom: (r: RoomDetailType) =>
//         set({
//             room: r,
//         }),
//     setCfg: (c: RoomCfgType) =>
//         set({
//             cfg: c,
//         }),
// }));
