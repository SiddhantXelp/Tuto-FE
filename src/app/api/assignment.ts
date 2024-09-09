import { BASE_URL } from './api';

export default {
    createAssignment: `${BASE_URL}/api/v1/assignments`,
    getAssignments: (page: string, limit: string) => `${BASE_URL}/api/v1/assignments?page=${page}&limit=${limit}`,
    getAssignmentById: (id: string) => `${BASE_URL}/api/v1/assignments/${id}`,
    completeAssignment: (id: string) => `${BASE_URL}/api/v1/assignments/${id}/status`,
    createStudentAssignment: `${BASE_URL}/api/v1/student-assignment`,
    getAssignmentStudents: (page: string, limit: string) => `${BASE_URL}/api/v1/students-with-assignments`,

};