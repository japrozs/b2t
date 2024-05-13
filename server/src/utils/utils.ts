export interface RoomCfgType {
    rooms: {
        // FIX: why are adults and children passed differently...
        adults: number;
        children: {
            age: number;
        }[];
    }[];
}

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
