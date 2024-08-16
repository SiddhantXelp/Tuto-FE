export const handelStudents = [
    { label: "Aarav Patel", value: "Aarav Patel" },
    { label: "Ishaan Sharma", value: "Ishaan Sharma" },
    { label: "Aanya Gupta", value: "Aanya Gupta" },
    { label: "Vihaan Singh", value: "Vihaan Singh" },
    { label: "Saanvi Mehta", value: "Saanvi Mehta" },
    { label: "Aryan Desai", value: "Aryan Desai" },
    { label: "Ananya Reddy", value: "Ananya Reddy" },
    { label: "Arjun Kumar", value: "Arjun Kumar" },
    { label: "Mira Iyer", value: "Mira Iyer" },
    { label: "Rohan Joshi", value: "Rohan Joshi" }
  ];


export const formFields = [
    {
      type: 'text',
      name: 'titleName',
      label: 'Assignment Title',
      placeholder: 'Write your assignment title'
    },
    {
      type: 'text',
      name: 'subjects',
      label: 'Subject',
      placeholder: 'Enter subject'
    },
    {
      type: 'select',
      name: 'student',
      label: 'Students',
      options: [
        { label: 'Select all', value: 'Selectall' },
        { label: 'Mahesh', value: 'Mahesh' },
        { label: 'Suresh', value: 'Suresh' }
      ],
      lablename: 'Select an option'
    },
    {
      type: 'file',
      name: 'material',
      label: 'Material',
      placeholder: 'Upload file'
    },
    {
      type: 'date',
      name: 'dueDate',
      label: 'Date',
      placeholder: 'Select date'
    }
  ];