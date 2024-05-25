import axios from "axios";
import { useGetAllCitiesQuery } from "./generated/graphql";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "./types";

export const formatAutoCompleteResults = (
    struct: { d: string } | undefined
) => {
    if (!struct) {
        return { results: [] };
    }
    const stringified = `{"results" : ${struct.d}}`;
    return JSON.parse(stringified);
};

export interface SearchHotelStruct {
    city: string;
    // country: string;
    in: string;
    out: string;
    // adults: number;
    // children: number;
    cfg: RoomCfgType;
}

export interface DetailStruct {
    hotel: HotelSearchItemType;
    room: RoomDetailType;
    cfg: RoomCfgType;
}

export const useSearchHotels = async (struct: SearchHotelStruct) => {
    const { data: city, loading } = useGetAllCitiesQuery();
    while (!loading) {}
    console.log(city);
    return city;
};

export const getCheapestRoom = (rooms: RoomDetailType[]): RoomDetailType => {
    let minTotalRate = Infinity;
    let room: RoomDetailType = rooms[0];
    rooms.forEach((roomLoop: RoomDetailType) => {
        if (roomLoop.TotalRate < minTotalRate) {
            minTotalRate = roomLoop.TotalRate;
            room = roomLoop;
        }
    });
    return room;
};

export const nightsBetween = (date1: any, date2: any) =>
    Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

export const formatRoomCfg = (cfg: RoomCfgType) => {
    const ret = [];
    for (let i = 0; i < cfg.rooms.length; i++) {
        const room = {
            Adult: Array(cfg.rooms[i].adults).fill({
                Age: 25,
            }),
            // Child: Array(cfg.rooms[i].children).fill({
            //     Age: 11,
            // }),
            Child: cfg.rooms[i].children.map((child: { age: number }) => ({
                Age: child.age,
            })),
        };
        ret.push(room);
    }
    return ret;
};

export const IS_EMPTY = (...structs: object[]) => {
    structs.forEach((struct: object) => {
        if (Object.keys(struct).length === 0) return true;
    });
    return false;
};

export const formatCfg = (cfg: RoomCfgType, room: RoomDetailType) => {
    const formattedRoomCfg = formatRoomCfg(cfg);
    formattedRoomCfg.forEach((cfg) => {
        (cfg as any).RoomTypeCode = room.RoomTypeCode;
        (cfg as any).MealPlanCode = parseInt(room.MealPlanCode);
        (cfg as any).ContractTokenId = parseInt(room.ContractTokenId);
        (cfg as any).RoomConfigurationId = room.RoomConfigurationId;
    });
    return formattedRoomCfg;
};

export const parseDate = (str: string): Date => {
    if (!/^(\d){8}$/.test(str)) return new Date();
    var y = parseInt(str.substring(0, 4)),
        m = parseInt(str.substring(4, 2)),
        d = parseInt(str.substring(6, 2));
    return new Date(y, m, d);
};

// interface CheckoutInfoDataType {
//     title: string;
//     firstName: string;
//     lastName: string;
//     age: string;
//     nationality: string;
//     gender: string;
// }
// interface CheckoutInfoType {
//     adultsData: CheckoutInfoDataType[];
//     childrenData: CheckoutInfoDataType[];
// }

// export const mergeInfoAndConfig = (
//     info: CheckoutInfoType,
//     cfg: RoomCfgType
// ) => {
//     return info;
// };
