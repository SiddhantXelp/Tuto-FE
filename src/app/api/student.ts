import { BASE_URL } from './api';

export default {
    createPackage: `${BASE_URL}/api/v1/packages`,
    getStudents: (page: string, limit: string) => `${BASE_URL}/api/v1/students?page=${page}&limit=${limit}`,
    getStudentsWithGroup: (id: string) => `${BASE_URL}/api/v1/groups/${id}`,
    createStudentGroup: `${BASE_URL}/api/v1/groups`,
    validateCredentials: (email: string, dob: string, name: string, gender: string) => `${BASE_URL}/api/v1/students/validate-credentials?email=${email}&dob=${dob}&name=${name}&gender=${gender}`,

};
