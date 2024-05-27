import { useGetAllCitiesQuery } from "@/generated/graphql";
import React, { useEffect, useState } from "react";
import { DropDown } from "./dropdown";

interface CityDropdownProps {
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
    city,
    setCity,
}) => {
    const { data, loading } = useGetAllCitiesQuery();
    const [formattedCities, setFormattedCities] = useState<
        Record<string, string>
    >({});
    useEffect(() => {
        const obj: Record<string, string> = {};
        data?.getAllCities.forEach((city) => {
            obj[city.code] = `(${city.code}) ${city.name}`;
        });
        const sortedCities = Object.entries(obj).sort((a, b) =>
            a[1].localeCompare(b[1])
        );
        const sortedCitiesObject = Object.fromEntries(sortedCities);
        setFormattedCities(sortedCitiesObject);
    }, [data]);
    return (
        <>
            {!loading && (
                <DropDown
                    options={formattedCities}
                    label="City"
                    state={city}
                    maxWidth
                    setState={setCity}
                />
            )}
        </>
    );
};
