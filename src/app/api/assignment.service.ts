import axios, { Canceler } from 'axios';
import apis from './assignment';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';


export const getMyFiles = async (token: string) => {
    console.log('GetFiles', token);

    try {
        const response = await axios.get(
            apis.getMyFiles,
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
            },
        );

        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log('Students......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};


export const getMyFilesById = async (token: string, id: string) => {
    console.log('GetFilesById', token);

    try {
        const response = await axios.get(
            apis.getMyFilesById(id),
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
            },
        );

        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log('Students......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};

