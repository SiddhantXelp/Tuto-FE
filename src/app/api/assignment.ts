import { BASE_URL } from './api';

export default {

    getMyFiles: `${BASE_URL}/api/v1/folders?limit=100&page=1`,
    getMyFilesById: (id: any) => `${BASE_URL}/api/v1/folders/${id}`,
    createFolder: `${BASE_URL}/api/v1/folders`,
    createFiles: `${BASE_URL}/api/v1/files`,
    deleteFolder: (id: string) => `${BASE_URL}/api/v1/folders/${id}`,
    deleteFiles: (id: string) => `${BASE_URL}/api/v1/files/${id}`,
    createAssignment: `${BASE_URL}/api/v1/assignments`,






};