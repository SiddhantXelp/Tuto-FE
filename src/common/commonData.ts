interface ButtonItem {
    id: number;
    name: string;
}




export const buttons: ButtonItem[] = [
    { id: 1, name: 'Zoom' },
    { id: 2, name: 'Google meet' },
];

export const options = [
    { label: 'Every day', value: 'Everyday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
];

export const Selectoptions = [
    {
        label: "Filter",
        name: "Filter",
        Optionlabel: "",
        options: [
            { label: "English", value: "English" },
            { label: "Social", value: "Social" },
            { label: "GroupA", value: "GroupA" },
            { label: "Group B", value: "Group B" },
        ],
    },

]


export const Tabbuttons: ButtonItem[] = [
    { id: 1, name: 'Create new class' },
    { id: 2, name: 'Virtual platform' },
];


export const groups = [
    {
      id: "56be1cdb-b891-4f74-8062-8dfc200b30f5",
      title: "Select Subject"
    },
    {
      id: "68b1b474-3120-4c44-af88-2a7fdd70723d",
      title: "English"
    },
    {
      id: "faecf314-5ea4-4536-adac-ef0343161e21",
      title: "Science"
    },
    {
      id: "d8b5e2f4-9d9d-4f42-9d5e-2c8b8a4f2b70",
      title: "Mathematics"
    },
    {
      id: "3bfa20f7-905b-4c39-9d21-1b2c8b7c4f90",
      title: "History"
    },
    {
      id: "7f8c2a5b-914d-4f4f-89a2-4e6f2b8e5a8c",
      title: "Geography"
    }
  ];
