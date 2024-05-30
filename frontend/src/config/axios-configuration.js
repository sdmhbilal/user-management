import axios from 'axios';

const AxiosBaseUrl = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  return axios;
};

export default AxiosBaseUrl;
