import axios, { Canceler } from 'axios';
import apis from './student';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';

export const createPackage = async (token: string, data: any) => {
    try {
        const response = await axios.post(
            apis.createPackage,
            data,
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'User-Agent': 'PostmanRuntime/7.36.1',
                    Accept: '/',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive',
                },
            },
        );

        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};



export const getStudent = async (token: string, page: string, limit: string) => {
    try {
        const response = await axios.get(
            apis.getStudents(page, limit),
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
            },
        );

        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};