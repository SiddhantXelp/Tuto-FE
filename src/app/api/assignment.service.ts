import axios, { Canceler } from 'axios';
import apis from './assignment';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';

export const createAssignment = async (token: string, data: any) => {
    try {
        const response = await axios.post(
            apis.createAssignment,
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


export const getAssignments = async (token: string, page: string, limit: string,status:string) => {
    try {
        const response = await axios.get(
            apis.getAssignments(page, limit,status),
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




export const getAssignmentById = async (token: string, id: string) => {

    try {
        const response = await axios.get(
            apis.getAssignmentById(id),
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



export const completeAssignment = async (token: string, status: any, id: any) => {
    try {
        const response = await axios.patch(
            apis.completeAssignment(id),
            status,
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



export const createStudentAssignment = async (token: string, data: any) => {
    try {
        const response = await axios.post(
            apis.createStudentAssignment,
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



export const getStudentsAssignments = async (token: string, page: string, limit: string, status: string) => {
    try {
        const response = await axios.get(
            apis.getAssignmentStudents(page, limit, status),
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
