import axios from 'axios';

import {
    BACKEND
} from './config';


export const graphQLCaller = (query, variables) => new Promise((resolve, reject) => {
    axios.post(`${BACKEND()}/graphql`, {
      query,
      variables,
    }).then((res) => {
      const { data } = res;
      const errors = data ? data.errors : {};
      if (errors) { reject(Error('lỗi')); } else { resolve(data.data); }
    }).catch((err) => {
      const { response, message } = err;
      if (response) reject(Error(`Kết nối CSDL không thành công: ${parseErrorResponse(response)}`));
      else reject(Error('Kết nối CSDL không thành công'));
    });
  });