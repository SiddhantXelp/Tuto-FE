import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const tableHeaderClasses = 'p-5 text-2xl font-semibold border-b border-gray-300 bg-gray-50';
const tableDataClasses = 'p-5 text-2xl border-b border-gray-300';
const imageClasses = 'rounded-lg border border-gray-300 object-cover shadow-md';

const pdfTemplate = (data: {
  studentName: string;
  grade: string;
  subject: string;
  totalMarks: string;
  marksGained: string;
  submittedDate: string;
  dueDate: string;
  remark: string
}) => `
  <div class="bg-white w-full border border-gray-300 rounded-lg p-10 box-border font-sans text-gray-800 shadow-lg">
    <h1 class="text-center text-5xl text-[#2c3e50] mb-8 font-bold">Assignment Report</h1>

    <h2 class="text-3xl text-gray-800 mb-16 font-semibold">Assignment Details</h2> 
    <table class="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden mb-8">
      <tbody>
        <tr class="bg-gray-100">
          <td class="${tableHeaderClasses}">Student Name:</td>
          <td class="${tableDataClasses}">${data.studentName}</td>
        </tr>
        <tr>
          <td class="${tableHeaderClasses}">Grade:</td>
          <td class="${tableDataClasses}">${data.grade}</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="${tableHeaderClasses}">Subject:</td>
          <td class="${tableDataClasses}">${data.subject}</td>
        </tr>
             
        <tr>
          <td class="${tableHeaderClasses}">Total Marks:</td>
          <td class="${tableDataClasses}">${data.totalMarks}</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="${tableHeaderClasses}">Marks Gained:</td>
          <td class="${tableDataClasses}">${data.marksGained}</td>
        </tr>
        <tr>
          <td class="${tableHeaderClasses}">Submitted Date:</td>
          <td class="${tableDataClasses}">${data.submittedDate}</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="${tableHeaderClasses}">Due Date:</td>
          <td class="${tableDataClasses}">${data.dueDate}</td>
        </tr>

      </tbody>
    </table>

    <h2 class="text-3xl text-gray-800 mb-16 font-semibold">Assignment Materials</h2>
    <div class="flex flex-wrap gap-6 justify-between">
      <img src="/homework1.jpg" alt="Assignment Screenshot 1" class="${imageClasses}" style="width: 48%; height: auto;" />
      <img src="/homework2.jpg" alt="Assignment Screenshot 2" class="${imageClasses}" style="width: 48%; height: auto;" />
    </div>
  </div>
`;

// PDF generation function
// export const generatePdf = async (data: {
//   studentName: string;
//   grade: string;
//   subject: string;
//   totalMarks: string;
//   marksGained: string;
//   submittedDate: string;
//   dueDate: string;
// }) => {
//   // Create a temporary container to hold the content
//   const container = document.createElement('div');
//   container.innerHTML = pdfTemplate(data);
//   document.body.appendChild(container);

//   try {
//     // Convert the content to a canvas
//     const canvas = await html2canvas(container, { scale: 2, useCORS: true });
//     const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, mm units, A4 size

//     // Calculate image dimensions
//     const imgWidth = 210; // A4 width in mm
//     const pageHeight = 297; // A4 height in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     // Adjust PDF height to fit content
//     const pdfHeight = Math.min(pageHeight, imgHeight);

//     // Add the first page
//     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pdfHeight);
//     heightLeft -= pdfHeight;

//     // Add additional pages if necessary
//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = heightLeft > pdfHeight ? -pdfHeight : -heightLeft;
//       pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, pdfHeight);
//       heightLeft -= pdfHeight;
//     }

//     // Save the PDF
//     pdf.save('assignment-summary.pdf');
//   } catch (error) {
//     console.error("Error capturing HTML to canvas:", error);
//   } finally {
//     // Clean up the temporary container
//     document.body.removeChild(container);
//   }
// };

export const generatePdf = async (data: {
  studentName: string;
  grade: string;
  subject: string;
  totalMarks: string;
  marksGained: string;
  submittedDate: string;
  dueDate: string;
  remark: string
}, setLoading: (loading: boolean) => void) => {
  // Show the spinner
  setLoading(true);

  // Create a temporary container to hold the content
  const container = document.createElement('div');
  container.innerHTML = pdfTemplate(data);
  document.body.appendChild(container);

  try {
    // Convert the content to a canvas
    const canvas = await html2canvas(container, { scale: 2, useCORS: true });
    const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, mm units, A4 size

    // Calculate image dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Adjust PDF height to fit content
    const pdfHeight = Math.min(pageHeight, imgHeight);

    // Add the first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pdfHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if necessary
    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft > pdfHeight ? -pdfHeight : -heightLeft;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, pdfHeight);
      heightLeft -= pdfHeight;
    }

    // Save the PDF
    pdf.save('assignment-summary.pdf');
  } catch (error) {
    console.error("Error capturing HTML to canvas:", error);
  } finally {
    // Clean up the temporary container and hide the spinner
    document.body.removeChild(container);
    setLoading(false);
  }
};