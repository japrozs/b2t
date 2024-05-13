import axios from "axios";
import { useGetCitiesQuery } from "./generated/graphql";
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

export const validateAvailability = (
    hotel: HotelSearchItemType,
    room: RoomDetailType,
    cfg: RoomCfgType
) => {
    const formattedRoomCfg = formatRoomCfg(cfg);
    formattedRoomCfg.forEach((cfg) => {
        (cfg as any).RoomTypeCode = room.RoomTypeCode;
        (cfg as any).MealPlanCode = parseInt(room.MealPlanCode);
        (cfg as any).ContractTokenId = parseInt(room.ContractTokenId);
        (cfg as any).RoomConfigurationId = room.RoomConfigurationId;
    });
    axios
        .post("/proxy?url=https://api.iwtxconnect.com/hotel/api/v1/search", {
            OutputFormat: "JSON",
            Profile: {
                Password: process.env.NEXT_PUBLIC_API_PASSWORD,
                Code: process.env.NEXT_PUBLIC_API_CODE,
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
            SearchCriteria: {
                RoomConfiguration: {
                    Room: formattedRoomCfg,
                },
                StartDate: hotel.StartDate,
                EndDate: hotel.EndDate,
                HotelCode: hotel.HotelCode,
                City: "LON",
                Nationality: "LON",
                IncludeRateDetails: "Y",
                CancellationPolicy: "Y",
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    // const options = {
    //     method: "POST",
    //     url: `https://api.iwtxconnect.com/hotel/api/v1/search`,
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         Profile: {
    //             Password: process.env.NEXT_PUBLIC_API_PASSWORD,
    //             Code: process.env.NEXT_PUBLIC_API_CODE,
    //             TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
    //         },
    //         SearchCriteria: {
    //             RoomConfiguration: {
    //                 Room: formattedRoomCfg,
    //             },
    //             StartDate: hotel.StartDate,
    //             EndDate: hotel.EndDate,
    //             HotelCode: hotel.HotelCode,
    //             City: "LON",
    //             // THIS IS NATIONALITY OF TRAVELLER
    //             Nationality: "LON",
    //             IncludeRateDetails: "Y",
    //             CancellationPolicy: "Y",
    //         },
    //     }),
    // };

    // request(options, function (error: Error, response: any) {
    //     if (error) {
    //         console.log({
    //             error: "Could not get hotel list",
    //             err_msg: error.message,
    //         });
    //     }
    //     console.log(JSON.parse(response.body));
    // });
};
