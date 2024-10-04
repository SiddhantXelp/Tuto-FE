import { BASE_URL } from './api';

export default {

    getUsers: `${BASE_URL}/api/v1/user?limit=10`,
    onBoardTutor: (id: string) => `${BASE_URL}/api/v1/tutors/${id}`,
    getTutorSubjects: (id: string) => `${BASE_URL}/api/v1/tutors/${id}`,

};