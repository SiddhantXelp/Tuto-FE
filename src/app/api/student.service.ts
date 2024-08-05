import axios, { Canceler } from 'axios';
import apis from './student';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';

export const createPackage = async (token: string, data: any) => {
    console.log('getClasses', token);

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
            console.log('classes......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};
