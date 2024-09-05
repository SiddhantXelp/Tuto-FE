export const stepContents = [
    <div key="step1" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-0">
        <div className="flex flex-col gap-2">
            <span className="text-gray-800 text-sm font-semibold">Meeting with Mr. Mishra</span>
            <span className="text-gray-600 text-xs">At 07:00pm - 08:00pm, Friday Aug 23, 2023</span>
        </div>
    </div>,
    <div key="step2" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-3">
        <div className="flex flex-col gap-2">
            <span className="text-gray-800 text-sm font-semibold">Meeting with Mr. Mishra</span>
            <span className="text-gray-600 text-xs">At 09:00pm - 10:00pm, Friday Aug 23, 2023</span>
        </div>
    </div>,
    <div key="step3" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-3">
        <div className="flex flex-col gap-2">
            <span className="text-gray-800 text-sm font-semibold">Content for Step 3</span>
            <span className="text-gray-600 text-xs">Additional details or content for step 3 go here.</span>
        </div>
    </div>
];

export const steps = stepContents.map((_, index) => ({
    label: `Step ${index + 1}`,
    content: (
        <div>
            {stepContents.slice(0, index + 1).map((content, contentIndex) => (
                <div key={contentIndex}>{content}</div>
            ))}
        </div>
    )
}));