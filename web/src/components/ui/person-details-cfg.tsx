import { useEffect, useState } from "react";
import { DropDown } from "./dropdown";
import { countryList } from "@/utils/cities";

interface PersonDetailsProps {
    personType: "Adult" | "Child";
    personIndex: number;
    onDataChange: (data: any) => void;
}

{
    /* TODO: try and add validation to these input boxes if possible */
}
export const PersonDetailsCfg: React.FC<PersonDetailsProps> = ({
    personType,
    personIndex,
    onDataChange,
}) => {
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        const data = {
            title,
            firstName,
            lastName,
            age,
            nationality,
            gender,
        };
        onDataChange(data);
    }, [title, firstName, lastName, age, nationality, gender]);

    return (
        <div className="py-2">
            <p className="text-md font-medium mb-1">
                {personType} {personIndex + 1} details
            </p>
            {/* TODO: add labels to these inputs (its ambigous) */}
            <div className="flex items-center space-x-5">
                {/* <input
                    className="w-min border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Mr, Mrs, Miss, Ms"
                /> */}
                <DropDown
                    options={{
                        Mr: "Mr",
                        Mrs: "Mrs",
                        Miss: "Miss",
                        Ms: "Ms",
                    }}
                    label="Title"
                    state={title}
                    setState={setTitle}
                />
                <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder="First name"
                />
                <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder="Last name"
                />
            </div>
            <div className="flex items-center space-x-5 mt-1.5">
                <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                    type="number"
                    placeholder="Age"
                />
                {/* <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={nationality}
                    onChange={(e) => {
                        setNationality(e.target.value);
                    }}
                    placeholder="Nationality"
                /> */}
                <DropDown
                    options={countryList}
                    label="Nationality"
                    state={nationality}
                    setState={setNationality}
                />
                {/* <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={gender}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                    placeholder="Gender (M/F)"
                /> */}
                <DropDown
                    options={{
                        M: "Male",
                        F: "Female",
                    }}
                    label="Gender"
                    state={gender}
                    setState={setGender}
                />
            </div>
        </div>
    );
};
