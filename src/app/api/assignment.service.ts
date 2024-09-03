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

export const createFolder = async (token: string, data: any) => {
    console.log('createFolder:', data);
    try {
        const response = await axios.post(
            apis.createFolder,
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
            console.log('createFolderERRROOORRR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};



export const createFiles = async (token: string, data: any) => {
    console.log('createFiles:', data);
    try {
        const response = await axios.post(
            apis.createFiles,
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
            console.log('createFilesRRROOORRR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};




export const deleteFolders = async (token: string, id: any) => {
    console.log('createFiles:', id);
    try {
        const response = await axios.delete(
            apis.deleteFolder(id),
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
        console.log(":>>>>>>>>>>>>:response", response);

        return response;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log('createFilesRRROOORRR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};




export const deleteFiles = async (token: string, id: any) => {
    console.log('createFiles:', id);
    try {
        const response = await axios.delete(
            apis.deleteFiles(id),
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

        return response;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log('createFilesRRROOORRR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};



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
            console.log('createAssignmentERRROOORRR......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};


export const getAssignments = async (token: string, page: string, limit: string) => {
    console.log('Get Assignment', token);

    try {
        const response = await axios.get(
            apis.getAssignments(page, limit),
            {
                cancelToken: new CancelToken(c => {
                    cancelAuth = c;
                }),
            },
        );

        return response.data;
    } catch (e) {
        if (axios.isCancel(e)) {
            console.log('getAssignments......', e);
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
            console.log('Students......', e);
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};