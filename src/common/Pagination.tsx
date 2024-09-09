import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-4 mb-5">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-4 py-2 border rounded-lg ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
            >
                Previous
            </button>

            <span className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-4 py-2 border rounded-lg ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
