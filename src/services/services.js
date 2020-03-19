import axios from 'axios';

const appURL = 'http://localhost:5000/sing-up';

class Services {
  submitFormData = data => {
    return axios.post(appURL, data);
  };
}
export default new Services();
