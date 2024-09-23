import { BASE_URL } from './api';

export default {
    createAssignment: `${BASE_URL}/api/v1/assignments`,
    getAssignments: (page: string, limit: string, status: string) => `${BASE_URL}/api/v1/students-with-assignments?page=${page}&limit=${limit}&status=${status}`,
    getAssignmentById: (id: string, studentId: string) => `${BASE_URL}/api/v1/assignments/${id}/students/${studentId}`,
    completeAssignment: (id: string,studentId:string) => `${BASE_URL}/api/v1/assignments/${id}/students/${studentId}`,
    createStudentAssignment: `${BASE_URL}/api/v1/student-assignment`,
    getAssignmentStudents: (page: string, limit: string, status: string) => `${BASE_URL}/api/v1/students-with-assignments`,

};