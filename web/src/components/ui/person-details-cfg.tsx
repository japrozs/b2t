import { useEffect, useState } from "react";
import { DropDown } from "./dropdown";
import { countryList } from "@/utils/countries";
import { RoomDetailType } from "@/types";

interface PersonDetailsProps {
    personType: "Adult" | "Child";
    personIndex: number;
    childAge?: number;
    onDataChange: (data: any) => void;
}

export const PersonDetailsCfg: React.FC<PersonDetailsProps> = ({
    personType,
    personIndex,
    onDataChange,
    childAge,
}) => {
    const [title, setTitle] = useState("Mr");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(childAge?.toString() || "");
    const [nationality, setNationality] = useState("LON");
    const [gender, setGender] = useState("M");
    console.log(childAge);

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
            <div className="flex items-center">
                <div className="w-full">
                    <DropDown
                        options={{
                            Mr: "Mr",
                            Mrs: "Mrs",
                            Miss: "Miss",
                            Ms: "Ms",
                        }}
                        // label="Title"
                        state={title}
                        setState={setTitle}
                    />
                </div>
                <div className="w-full pl-6">
                    <input
                        className="border w-full border-gray-200 rounded-md text-sm py-1 px-2"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        placeholder="First name"
                    />
                </div>
                <div className="w-full pl-6">
                    <input
                        className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-5 mt-1.5">
                <input
                    className="w-full border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                    onKeyPress={(event) => {
                        const charCode = event.which
                            ? event.which
                            : event.keyCode;
                        if (
                            charCode !== 46 &&
                            charCode > 31 &&
                            (charCode < 48 || charCode > 57)
                        ) {
                            event.preventDefault();
                        }
                    }}
                    type="number"
                    placeholder="Age"
                />
                <DropDown
                    options={countryList}
                    // label="Nationality"
                    state={nationality}
                    setState={setNationality}
                />
                <DropDown
                    options={{
                        M: "Male",
                        F: "Female",
                    }}
                    // label="Gender"
                    state={gender}
                    setState={setGender}
                />
            </div>
        </div>
    );
};
