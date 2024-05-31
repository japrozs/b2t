import { useGetAllCitiesQuery } from "@/generated/graphql";
import React, { useEffect, useState } from "react";
import { DropDown } from "./dropdown";
import Select from "react-select";

interface CityDropdownProps {
    city: {
        value: string;
        label: string;
    };
    label?: string;
    fullWidth?: boolean;
    setCity: React.Dispatch<
        React.SetStateAction<{
            value: string;
            label: string;
        }>
    >;
}

export const CityDropdown: React.FC<CityDropdownProps> = ({
    city,
    label,
    fullWidth,
    setCity,
}) => {
    const { data, loading } = useGetAllCitiesQuery();
    const [formattedCities, setFormattedCities] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    useEffect(() => {
        const arr: {
            value: string;
            label: string;
        }[] = [];
        data?.getAllCities.forEach((city) => {
            arr.push({
                value: city.code,
                label: `(${city.code}) ${city.name}`,
            });
        });
        setFormattedCities(arr);
    }, [data]);
    return (
        <>
            {!loading && (
                <>
                    <p className="text-sm font-medium mb-1 text-gray-600">
                        {label}
                    </p>
                    <Select
                        className="w-full ml-auto mr-0 text-sm transition-all cursor-pointer outline-none text-gray-500 font-medium bg-white rounded-md"
                        onChange={(e) => {
                            setCity(e as any);
                        }}
                        defaultValue={city}
                        value={city}
                        options={formattedCities}
                    />
                </>
            )}
        </>
    );
};
