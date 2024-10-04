import { BASE_URL } from './api';

export default {
    createPackage: `${BASE_URL}/api/v1/packages`,
    getStudents: (id: string, page: string, limit: string) => `${BASE_URL}/api/v1/students/${id}?page=${page}&limit=${limit}`,
    getStudentsWithGroup: (id: string) => `${BASE_URL}/api/v1/groups/${id}`,
    createStudentGroup: `${BASE_URL}/api/v1/groups`,
    validateCredentials: (email: string, dob: string, name: string, gender: string) => `${BASE_URL}/api/v1/students/validate-credentials?email=${email}&dob=${dob}&name=${name}&gender=${gender}`,
    onBoardStudent: `${BASE_URL}/api/v1/students/onboard`,


};
