import axios, { Canceler } from 'axios';
import apis from './user';
const { CancelToken } = axios;
let cancelAuth: Canceler;

export const DISCLOSURE_CANCEL = 'cancel';





export const getUsersList = async (token: string) => {
  console.log('getStudents', token);

  try {
    const response = await axios.get(
      apis.getUsers,
      // {},
      {
        cancelToken: new CancelToken(c => {
          cancelAuth = c;
        }),
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   'User-Agent': 'PostmanRuntime/7.36.1',
        //   Accept: '/',
        //   'Accept-Encoding': 'gzip, deflate, br',
        //   Connection: 'keep-alive',
        // },
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

