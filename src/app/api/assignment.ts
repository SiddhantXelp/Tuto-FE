import { BASE_URL } from './api';

export default {

    getMyFiles: `${BASE_URL}/api/v1/folders`,
    getMyFilesById: (id: any) => `${BASE_URL}/api/v1/folders/${id}`,

};