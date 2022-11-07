import axios from 'axios';

const form = {
  baseUrl: 'http://localhost:3085/',
}
async function $_getApi(url, config) {
  const data = ref(null);
  const error = ref(null);

  try {
    const res = await axios.get(`${form.baseUrl}${url}/`, config);
    console.log('data detected!', url, res);
    data.value = res.data;
  } catch (err) {
    if (process.dev) {
      console.error(err);
    }
    error.value = err;
  }

  return { data, error } 
}

async function $_postApi(url, reqData=null, config=null) {
  const data = ref(null);
  const error = ref(null);

  try {
    const res = await axios.post(`${form.baseUrl}${url}`, reqData, config);
    console.log('post data detected', res);
    data.value = res.data;
  } catch (err) {
    if (process.dev) {
      console.error(err);
    }
    error.value = err?.response?.data ?? { errorCode: 0, message: '서버 상에 문제가 발생했습니다.'};
  }
  return { data, error };
}

export {
  $_getApi,
  $_postApi
}