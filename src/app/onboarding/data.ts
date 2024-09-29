interface Field {
    labelName: string;
    type: string;
    name: string;
    id: string;
    value: string;
    radioOptions?: { label: string; value: string }[];
}

export const fields: Field[] = [
    {
        labelName: "Name",
        type: "text",
        name: "name",
        id: "username",
        value: ""
    },
    {
        labelName: "Gender",
        type: "radio",
        name: "gender",
        id: "gender",
        value: "",
        radioOptions: [
            { label: "Boy", value: "M" },
            { label: "Girl", value: "F" },
            { label: "Prefer not to disclose", value: "Prefer not to disclose" }
        ]
    },
    {
        labelName: "DOB",
        type: "date",
        name: "dob",
        id: "dob",
        value: ""
    },
    {
        labelName: "Mobile Number",
        type: "text",
        name: "mobileNumber",
        id: "mobileNumber",
        value: ""
    },
    {
        labelName: "Email",
        type: "email",
        name: "email",
        id: "email",
        value: ""
    }
];
