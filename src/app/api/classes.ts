import { BASE_URL } from './api';

export default {

    getClasses: `${BASE_URL}/api/v1/classes`,
    createClass: `${BASE_URL}/api/v1/classes`,
    getStudentGroup: `${BASE_URL}/api/v1/groups`,
    getClassId: (id: any) => `${BASE_URL}/api/v1/classes/${id}?limit=10&page=1`,
    addStudentGroup: `${BASE_URL}/api/v1/groups/add-students`,
    getClassWithStudentDetails: (studentId: String, classId: String) => `${BASE_URL}/api/v1/classes/${studentId}/students/${classId}`,




};
