import axios, { Canceler } from 'axios';
import apis from './classes';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';





export const getClasses = async (token: string) => {
  try {
    const response = await axios.get(
      apis.getClasses,
      // {},
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

export const createClass = async (token: string, data: any) => {
  try {
    const response = await axios.post(
      apis.createClass,
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


export const getStudentGroup = async (token: string) => {
  try {
    const response = await axios.get(
      apis.getStudentGroup,
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


export const getClassesById = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      apis.getClassId(id),
      // {},
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

export const addStudentGroup = async (token: string, data: any) => {
  try {
    const response = await axios.post(
      apis.addStudentGroup,
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

export const getClassWithStudents = async (token: string, studentId: string, classId: string) => {
  try {
    const response = await axios.get(
      apis.getClassWithStudentDetails(studentId, classId),
      // {},
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

