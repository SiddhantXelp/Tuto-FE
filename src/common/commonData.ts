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
    Optionlabel: "type of class",
    options: [
      { label: "English", value: "English" },
      { label: "Social", value: "Social" },
      { label: "GroupA", value: "GroupA" },
      { label: "Group B", value: "Group B" },
    ],
  },

]


export const TabButtons: ButtonItem[] = [
  { id: 1, name: 'Create new class' },
  { id: 2, name: 'Virtual platform' },
];


export const groups = [
  {
    id: "Select Subject",
    title: "Select Subject"
  },
  {
    id: "English",
    title: "English"
  },
  {
    id: "Science",
    title: "Science"
  },
  {
    id: "Mathematics",
    title: "Mathematics"
  },
  {
    id: "History",
    title: "History"
  },
  {
    id: "Geography",
    title: "Geography"
  }
];



