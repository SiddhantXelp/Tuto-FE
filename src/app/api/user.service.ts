import axios, { Canceler } from 'axios';
import apis from './user';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';





export const getUsersList = async (token: string) => {
  try {
    const response = await axios.get(
      apis.getUsers,
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

