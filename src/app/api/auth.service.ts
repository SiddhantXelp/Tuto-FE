import axios, { Canceler } from 'axios';
import apis from './auth';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';


export const postSignup = async (token: string, data: any) => {
    console.log('Data:', data);
    try {
        const response = await axios.post(
            apis.signup,
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
            console.log('SignupERROR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};


export const login = async (data: any) => {
    console.log('Data:', data);
    try {
        const response = await axios.post(
            apis.login,
            data,
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
                headers: {
                    // Authorization: `Bearer ${token}`,
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
            console.log('SignupERROR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};