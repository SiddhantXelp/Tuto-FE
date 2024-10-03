import axios, { Canceler } from 'axios';
import apis from './myFiles';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';


export const getMyFiles = async (token: string) => {

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
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};

export const createFolder = async (token: string, data: any) => {
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
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};



export const createFiles = async (token: string, data: any) => {
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
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};




export const deleteFolders = async (token: string, id: any) => {
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
        return response;
    } catch (e) {
        if (axios.isCancel(e)) {
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};




export const deleteFiles = async (token: string, id: any) => {
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
            throw new Error(DISCLOSURE_CANCEL);
        }
        throw e;
    }
};

export const updateFolder = async (token: string, data: any, id: string) => {
    try {
        const response = await axios.put(
            apis.updateFolderName(id),
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


export const updateFile = async (token: string, data: any, id: string) => {
    try {
        const response = await axios.put(
            apis.updateFileName(id),
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
