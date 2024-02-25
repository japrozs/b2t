import { City } from "../entities/city";
import { Arg, Query } from "type-graphql";

export class CityResolver {
    @Query(() => City)
    async getCity(@Arg("code", () => String) code: string) {
        return City.findOne({ where: { code }, relations: ["hotels"] });
    }
    @Query(() => [City])
    async getCities() {
        return City.find({});
    }
}
