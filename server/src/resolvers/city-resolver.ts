import { isAuth } from "../middleware/is-auth";
import { Arg, Query, UseMiddleware } from "type-graphql";
import { City } from "../entities/city";

export class CityResolver {
    @UseMiddleware(isAuth)
    @Query(() => City)
    async getCity(@Arg("code", () => String) code: string) {
        return City.findOne({ where: { code }, relations: ["hotels"] });
    }

    @UseMiddleware(isAuth)
    @Query(() => [City])
    async getAllCities() {
        return City.find({});
    }
}
