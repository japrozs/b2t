import useSWR from "swr";
import { HotelListType, RoomCfgType, RoomDetailType } from "./types";
import { useGetCitiesQuery, useGetCityQuery } from "./generated/graphql";

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

export const useSearchHotels = async (struct: SearchHotelStruct) => {
    const { data: city, loading } = useGetCitiesQuery();
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
